import React, { useState, createRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { message } from 'antd'
import Video from 'twilio-video'
import PropTypes from 'prop-types'
import VideoModal from './VideoModal'
import { resetToken } from '../../actions/twilio/resetToken.action'

const TwilioVideo = props => {
  const roomName = props.record.id
  const token = useSelector(state => state.twilio.token)
  const [isModalVisible, toggleModal] = useState(false)
  const [localMediaAvailable, setLocalMediaAvailable] = useState(false)
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false)
  const [hasLeftRoom, setHasLeftRoom] = useState(false)
  const [activeRoom, setActiveRoom] = useState(null)
  const [remoteMediaAvailable, setRemoteMediaAvailable] = useState(false)
  const [localMedia] = useState(createRef())
  const [remoteMedia] = useState(createRef())
  const dispatch = useDispatch()

  useEffect(() => {
    if (hasLeftRoom) {
      setHasLeftRoom(false)
      dispatch(resetToken())
      toggleModal(false)
    } else if (token && !hasJoinedRoom) {
      joinRoom()
      setHasJoinedRoom(true)
    }
  })

  const roomJoined = room => {
    try {
      setActiveRoom(room)
      setLocalMediaAvailable(true)
      setHasJoinedRoom(true)
      if (localMedia) {
        attachParticipantTracks(room.localParticipant, localMedia.current)
      }
      room.participants.forEach(participant => {
        // todo: replace this
        console.log(`Already in room ${participant.identity}`)
        if (remoteMedia) {
          setRemoteMediaAvailable(true)
          participantConnected(participant, remoteMedia.current)
        }
      })
      room.on('participantConnected', participant => {
        // todo: replace this
        console.log(`Joining ${participant.identity}`)
        setRemoteMediaAvailable(true)
        participantConnected(participant, remoteMedia.current)
      })
      room.on('participantDisconnected', participant => {
        // todo: replace this
        console.log(`Participant ${participant.identity} left the room`)
        detachParticipantTracks(participant)
      })
      room.on('disconnected', () => {
        detachParticipantTracks(room.localParticipant)
        room.participants.forEach(detachParticipantTracks)
        setActiveRoom(null)
        setHasJoinedRoom(false)
        setHasLeftRoom(true)
        setLocalMediaAvailable(false)
      })
    } catch (error) {
      message.error(error.message, 10)
    }
  }

  const joinRoom = async () => {
    try {
      toggleModal(true)
      const connectOptions = {
        name: roomName,
        audio: true,
        video: { width: 144 }
      }
      const room = await Video.connect(token, connectOptions)
      roomJoined(room)
    } catch (error) {
      message.error(error.message, 10)
    }
  }

  const attachTrack = (track, container) => {
    container.appendChild(track.attach())
  }

  const attachTracks = (tracks, container) => {
    tracks.forEach(track => {
      if (track.track) {
        attachTrack(track.track, container)
      } else {
        attachTrack(track, container)
      }
    })
  }

  const attachParticipantTracks = (participant, container) => {
    const tracks = Array.from(participant.tracks.values())
    attachTracks(tracks, container)
  }

  const leaveRoom = () => {
    if (activeRoom) {
      activeRoom.disconnect()
    }
  }

  const getTracks = participant => {
    return Array.from(participant.tracks.values())
      .filter(publication => publication.track)
      .map(publication => publication.track)
  }

  const detachTrack = track => {
    track.detach().forEach(detachedElement => detachedElement.remove())
  }

  const detachParticipantTracks = participant => {
    const tracks = getTracks(participant)
    tracks.forEach(detachTrack)
  }

  const trackPublished = (publication, container) => {
    if (publication.isSubscribed) {
      attachTrack(publication.track, container)
    }
    publication.on('subscribed', track => {
      attachTrack(track, container)
    })
    publication.on('unsubscribed', detachTrack)
  }

  const participantConnected = (participant, container) => {
    participant.tracks.forEach(publication => {
      trackPublished(publication, container)
    })
    participant.on('trackPublished', publication =>
      trackPublished(publication, container)
    )
  }

  window.addEventListener('beforeunload', leaveRoom)

  return (
    <VideoModal
      record={props.record}
      isModalVisible={isModalVisible}
      localMediaAvailable={localMediaAvailable}
      localMedia={localMedia}
      remoteMedia={remoteMedia}
      leaveRoom={leaveRoom}
      remoteMediaAvailable={remoteMediaAvailable}
    />
  )
}

TwilioVideo.propTypes = {
  record: PropTypes.object.isRequired
}

export default TwilioVideo
