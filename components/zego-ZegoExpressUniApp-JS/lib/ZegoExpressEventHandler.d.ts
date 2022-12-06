import { ZegoRoomState, ZegoPublisherState, ZegoPlayerState, ZegoMediaPlayer, ZegoMediaPlayerState, ZegoMediaPlayerNetworkEvent, ZegoUser, ZegoPublishChannel, ZegoUpdateType, ZegoStream, ZegoPublishStreamQuality, ZegoPlayStreamQuality, ZegoPlayerMediaEvent, ZegoBroadcastMessageInfo, ZegoBarrageMessageInfo, ZegoAudioRoute, ZegoDeviceExceptionType, ZegoDeviceType, ZegoEngineState, ZegoRemoteDeviceState, ZegoStreamRelayCDNInfo, ZegoSoundLevelInfo, ZegoRoomExtraInfo } from './ZegoExpressDefines';
export declare type ZegoAnyCallback = (...args: any[]) => any;
export interface ZegoEventListener {
    /**
     * @event ZegoExpressEngine#onApiCalledResult
     * @desc Method execution result callback
     *
     * @property {number} errorCode - Error code, please refer to the Error Codes https://doc-en.zego.im/en/308.html for details
     * @property {string} funcName - Function name
     * @property {string} info - Detailed error information
     */
    apiCalledResult: (errorCode: number, funcName: string, info: string) => void;
    /**
     * @event ZegoExpressEngine#onEngineStateUpdate
     * @desc The callback triggered when the audio/video engine state changes.
     *
     * When the developer calls the function that enables audio and video related functions, such as calling [startPreview], [startPublishingStream], [startPlayingStream] and MediaPlayer related function, the audio/video engine will start; when all audio and video functions are stopped, the engine state will become stopped.
     * When the developer has been [loginRoom], once [logoutRoom] is called, the audio/video engine will stop (preview, publishing/playing stream, MediaPlayer and other audio and video related functions will also stop).
     *
     * @property {ZegoEngineState} state The audio/video engine state
     */
    engineStateUpdate: (state: ZegoEngineState) => void;
    /**
     * @event ZegoExpressEngine#onRoomStateUpdate
     * @desc The callback triggered when the room connection state changes.
     *
     * This callback is triggered when the connection status of the room changes, and the reason for the change is notified. Developers can use this callback to determine the status of the current user in the room. If the connection is being requested for a long time, the general probability is that the user's network is unstable.
     * @property {string} roomID - Room ID, a string of up to 128 bytes in length.
     * @property {ZegoRoomState} state - Changed room state
     * @property {number} errorCode - Error code, please refer to the Error Codes https://doc-en.zego.im/en/308.html for details
     * @property {string} extendedData - Extended Information with state updates. As the standby, only an empty json table is currently returned
     */
    roomStateUpdate: (roomID: string, state: ZegoRoomState, errorCode: number, extendedData: Object) => void;
    /**
     * @event ZegoExpressEngine#onRoomUserUpdate
     * @desc The callback triggered when the number of other users in the room increases or decreases.
     *
     * Note that the callback is only triggered when the isUserStatusNotify parameter in the ZegoRoomConfig passed loginRoom function is true. Developers can use this callback to determine the situation of users in the room.
     * If developers need to use ZEGO room users notifications, please make sure that each login user sets isUserStatusNotify to true
     * When a user logs in to a room for the first time, other users already exist in this room, and a user list of the type of addition is received.
     * When the user is already in the room, other users in this room will trigger this callback to notify the changed users when they enter or exit the room.
     * @property {string} roomID - Room ID where the user is logged in, a string of up to 128 bytes in length.
     * @property {ZegoUpdateType} updateType - Update type (add/delete)
     * @property {ZegoUser[]} userList - List of users changed in the current room
     */
    roomUserUpdate: (roomID: string, updateType: ZegoUpdateType, userList: ZegoUser[]) => void;
    /**
     * @event ZegoExpressEngine#onRoomOnlineUserCountUpdate
     * @desc The callback triggered every 30 seconds to report the current number of online users.
     *
     * This interface is called back every 30 seconds.
     * Developers can use this callback to show the number of user online in the current room.
     * @property {string} roomID - Room ID where the user is logged in, a string of up to 128 bytes in length.
     * @property {number} count - Count of online users
     */
    roomOnlineUserCountUpdate: (roomID: string, count: number) => void;
    /**
     * @event ZegoExpressEngine#onRoomStreamUpdate
     * @desc The callback triggered when the nu"
     * mber of streams published by the other users in the same room increases or decreases.
     *
     * When a user logs in to a room for the first time, there are other users in the room who are publishing streams, and will receive a stream list of the added type.
     * When the user is already in the room, other users in this room will trigger this callback to notify the changed stream list when adding or deleting streams.
     * Developers can use this callback to determine if there are other users in the same room who have added or stopped streaming, in order to implement active play stream [startPlayingStream] or active stop playing stream [stopPlayingStream], and use simultaneous Changes to Streaming render UI widget;
     * @property {string} result.roomID - Room ID where the user is logged in, a string of up to 128 bytes in length.
     * @property {ZegoUpdateType} result.updateType - Update type (add/delete)
     * @property {ZegoStream[]} result.streamList - Updated stream list
     */
    roomStreamUpdate: (roomID: string, updateType: ZegoUpdateType, streamList: ZegoStream[]) => void;
    /**
     * @event ZegoExpressEngine#onRoomStreamExtraInfoUpdate
     * @desc The callback triggered when there is an update on the extra information of the streams published by other users in the same room.
     *
     * Description: All users in the room will be notified by this callback when the extra information of the stream in the room is updated.
     * Use cases: Users can realize some business functions through the characteristics of stream extra information consistent with stream life cycle.
     * When to call /Trigger: When a user publishing the stream update the extra information of the stream in the same room, other users in the same room will receive the callback.
     * Restrictions: None.
     * Caution: Unlike the stream ID, which cannot be modified during the publishing process, the stream extra information can be updated during the life cycle of the corresponding stream ID.
     * Related APIs: Users who publish stream can set extra stream information through [setStreamExtraInfo].
     *
     * @property {string} roomID Room ID where the user is logged in, a string of up to 128 bytes in length.
     * @property {ZegoStream[]} streamList List of streams that the extra info was updated.
     */
    roomStreamExtraInfoUpdate: (roomID: string, streamList: ZegoStream[]) => void;
    /**
     * @event ZegoExpressEngine#onRoomExtraInfoUpdate
     * @desc The callback triggered when there is an update on the extra information of the room.
     *
     * Description: After the room extra information is updated, all users in the room will be notified except update the room extra information user.
     * Use cases: Extra information for the room.
     * When to call /Trigger: When a user update the room extra information, other users in the same room will receive the callback.
     * Restrictions: None.
     * Related APIs: Users can update room extra information through [setRoomExtraInfo] function.
     *
     * @param {string} roomID Room ID where the user is logged in, a string of up to 128 bytes in length.
     * @param {ZegoRoomExtraInfo} roomExtraInfoList List of the extra info updated.
     */
    roomExtraInfoUpdate: (roomID: string, roomExtraInfoList: ZegoRoomExtraInfo[]) => void;
    /**
     * @event ZegoExpressEngine#onRoomTokenWillExpire
     * @desc Callback notification that room Token authentication is about to expire.
     *
     * Description: The callback notification that the room Token authentication is about to expire, please use [renewToken] to update the room Token authentication.
     * Use cases: In order to prevent illegal entry into the room, it is necessary to perform authentication control on login room, push streaming, etc., to improve security.
     * When to call /Trigger: 30 seconds before the Token expires, the SDK will call [onRoomTokenWillExpire] to notify developer.
     * Restrictions: None.
     * Caution: The token contains important information such as the user's room permissions, publish stream permissions, and effective time, please refer to https://doc-en.zego.im/article/11649.
     * Related APIs: When the developer receives this callback, he can use [renewToken] to update the token authentication information.
     *
     * @property {string} roomID Room ID where the user is logged in, a string of up to 128 bytes in length.
     * @property {number} remainTimeInSecond The remaining time before the token expires.
     */
    roomTokenWillExpire: (roomID: string, remainTimeInSecond: number) => void;
    /**
     * @event ZegoExpressEngine#onPublisherStateUpdate
     * @desc The callback triggered when the state of stream publishing changes.
     *
     * After publishing the stream successfully, the notification of the publish stream state change can be obtained through the callback interface.
     * You can roughly judge the user's uplink network status based on whether the state parameter is in [PUBLISH_REQUESTING].
     * ExtendedData is extended information with state updates. If you use ZEGO's CDN content distribution network, after the stream is successfully published, the keys of the content of this parameter are flv_url_list, rtmp_url_list, hls_url_list. These correspond to the publishing stream URLs of the flv, rtmp, and hls protocols.
     * @property {string} streamID - Stream ID
     * @property {ZegoPublisherState} state - Status of publishing stream
     * @property {number} errorCode - The error code corresponding to the status change of the publish stream. Please refer to the Error Codes https://doc-en.zego.im/en/308.html for details.
     * @property {string} extendedData - Extended information with state updates.
     */
    publisherStateUpdate: (streamID: string, state: ZegoPublisherState, errorCode: number, extendedData: Object) => void;
    /**
     * @event ZegoExpressEngine#onPublisherQualityUpdate
     * @desc The callback triggered every 3 seconds to report the current stream publishing quality.
     *
     * After the successful publish, the callback will be received every 3 seconds. Through the callback, the collection frame rate, bit rate, RTT, packet loss rate and other quality data of the published audio and video stream can be obtained, and the health of the publish stream can be monitored in real time.
     * You can monitor the health of the published audio and video streams in real time according to the quality parameters of the callback api, in order to show the uplink network status in real time on the device UI interface.
     * If you does not know how to use the parameters of this callback api, you can only pay attention to the level field of the quality parameter, which is a comprehensive value describing the uplink network calculated by SDK based on the quality parameters.
     * @property {string} streamID - Stream ID
     * @property {ZegoPublishStreamQuality} quality - Published stream quality, including audio and video frame rate, bit rate, resolution, RTT, etc.
     */
    publisherQualityUpdate: (streamID: string, quality: ZegoPublishStreamQuality) => void;
    /**
     * @event ZegoExpressEngine#onPublisherCapturedAudioFirstFrame
     * @desc The callback triggered when the first audio frame is captured.
     *
     * After the startPublishingStream interface is called successfully, the SDK will receive this callback notification when it collects the first frame of audio data.
     * In the case of no startPublishingStream audio and video stream or preview, the first startPublishingStream audio and video stream or first preview, that is, when the engine of the audio and video module inside SDK starts, it will collect audio data of the local device and receive this callback.
     * Developers can use this callback to determine whether SDK has actually collected audio data. If the callback is not received, the audio capture device is occupied or abnormal.
     */
    publisherCapturedAudioFirstFrame: () => void;
    /**
     * @event ZegoExpressEngine#onPublisherCapturedVideoFirstFrame
     * @desc The callback triggered when the first video frame is captured.
     *
     * After the startPublishingStream interface is called successfully, the SDK will receive this callback notification when it collects the first frame of video data.
     * In the case of no startPublishingStream video stream or preview, the first startPublishingStream video stream or first preview, that is, when the engine of the audio and video module inside SDK starts, it will collect video data of the local device and receive this callback.
     * Developers can use this callback to determine whether SDK has actually collected video data. If the callback is not received, the video capture device is occupied or abnormal.
     * @property {ZegoPublishChannel} channel - Publishing stream channel.If you only publish one audio and video stream, you can ignore this parameter.
     */
    publisherCapturedVideoFirstFrame: (channel: ZegoPublishChannel) => void;
    /**
     * @event ZegoExpressEngine#onPublisherRenderVideoFirstFrame
     * @desc The callback triggered when the first video frame is rendered.
     *
     * Description: this callback will be called after SDK rendered the first frame of video data captured. This interface is for preview rendering. The first frame callback is only available for external collection and internal preview. If it is not for SDK rendering, there is no such callback.
     * Related callbacks: After the [startPublishingStream] function is called successfully, determine if the SDK actually collected audio data by the callback function [onPublisherCapturedAudioFirstFrame], determine if the SDK actually collected video data by the callback function [onPublisherCapturedVideoFirstFrame].
     *
     * @param channel Publishing stream channel.If you only publish one audio and video stream, you can ignore this parameter.
     */
    publisherRenderVideoFirstFrame: (channel: ZegoPublishChannel) => void;
    /**
     * @event ZegoExpressEngine#onPublisherVideoSizeChanged
     * @desc The callback triggered when the video capture resolution changes.
     *
     * After the successful publish, the callback will be received if there is a change in the video capture resolution in the process of publishing the stream.
     * When the audio and video stream is not published or previewed for the first time, the publishing stream or preview first time, that is, the engine of the audio and video module inside the SDK is started, the video data of the local device will be collected, and the collection resolution will change at this time.
     * You can use this callback to remove the cover of the local preview UI and similar operations.You can also dynamically adjust the scale of the preview view based on the resolution of the callback.
     * @property {number} width - Video capture resolution width
     * @property {number} rheight - Video capture resolution width
     * @property {ZegoPublishChannel} channel - Publishing stream channel.If you only publish one audio and video stream, you can ignore this parameter.
     */
    publisherVideoSizeChanged: (width: number, height: number, channel: ZegoPublishChannel) => void;
    /**
     * @event ZegoExpressEngine#onPublisherRelayCDNStateUpdate
     * @desc The callback triggered when the state of relayed streaming to CDN changes.
     *
     * Description: Developers can use this callback to determine whether the audio and video streams of the relay CDN are normal. If they are abnormal, further locate the cause of the abnormal audio and video streams of the relay CDN and make corresponding disaster recovery strategies.
     * Trigger: After the ZEGO RTC server relays the audio and video streams to the CDN, this callback will be received if the CDN relay status changes, such as a stop or a retry.
     * Caution: If you do not understand the cause of the abnormality, you can contact ZEGO technicians to analyze the specific cause of the abnormality.
     *
     * @param streamID Stream ID.
     * @param infoList List of information that the current CDN is relaying.
     */
    publisherRelayCDNStateUpdate: (streamID: string, infoList: ZegoStreamRelayCDNInfo[]) => void;
    /**
     * @event ZegoExpressEngine#onPlayerStateUpdate
     * @desc The callback triggered when the state of stream playing changes.
     *
     * After publishing the stream successfully, the notification of the publish stream state change can be obtained through the callback interface.
     * You can roughly judge the user's downlink network status based on whether the state parameter is in [PLAY_REQUESTING].
     * @property {string} streamID - stream ID
     * @property {ZegoPlayerState} state - Current play state
     * @property {number} result.errorCode - The error code corresponding to the status change of the playing stream. Please refer to the Error Codes https://doc-en.zego.im/en/308.html for details.
     * @property {string} result.extendedData - Extended Information with state updates. As the standby, only an empty json table is currently returned
     */
    playerStateUpdate: (streamID: string, state: ZegoPlayerState, errorCode: number, extendedData: Object) => void;
    /**
     * @event ZegoExpressEngine#onPlayerQualityUpdate
     * @desc The callback triggered every 3 seconds to report the current stream playing quality.
     *
     * After calling the startPlayingStream successfully, this callback will be triggered every 3 seconds. The collection frame rate, bit rate, RTT, packet loss rate and other quality data  can be obtained, such the health of the publish stream can be monitored in real time.
     * You can monitor the health of the played audio and video streams in real time according to the quality parameters of the callback api, in order to show the downlink network status on the device UI interface in real time.
     * If you does not know how to use the various parameters of the callback api, you can only focus on the level field of the quality parameter, which is a comprehensive value describing the downlink network calculated by SDK based on the quality parameters.
     * @property {string} treamID - Stream ID
     * @property {ZegoPlayStreamQuality} quality - Playing stream quality, including audio and video frame rate, bit rate, resolution, RTT, etc.
     */
    playerQualityUpdate: (streamID: string, quality: ZegoPlayStreamQuality) => void;
    /**
     * @event ZegoExpressEngine#onPlayerMediaEvent
     * @desc The callback triggered when a media event occurs during streaming playing.
     *
     * This callback is triggered when an event such as audio and video jamming and recovery occurs in the playing stream.
     * You can use this callback to make statistics on stutters or to make friendly displays in the UI interface of the app.
     * @property {string} streamID - Stream ID
     * @property {ZegoPlayerMediaEvent} event - Play media event callback
     */
    playerMediaEvent: (streamID: string, event: ZegoPlayerMediaEvent) => void;
    /**
     * @event ZegoExpressEngine#onPlayerRecvAudioFirstFrame
     * @desc The callback triggered when the first audio frame is received.
     *
     * After the startPlayingStream interface is called successfully, the SDK will receive this callback notification when it collects the first frame of audio data.
     * @property {string} rstreamID - Stream ID
     */
    playerRecvAudioFirstFrame: (streamID: string) => void;
    /**
     * @event ZegoExpressEngine#onPlayerRecvVideoFirstFrame
     * @desc The callback triggered when the first video frame is received.
     *
     * After the startPlayingStream interface is called successfully, the SDK will receive this callback notification when it collects the first frame of video  data.
     * @property {string} streamID - Stream ID
     */
    playerRecvVideoFirstFrame: (streamID: string) => void;
    /**
     * @event ZegoExpressEngine#onPlayerRenderVideoFirstFrame
     * @desc The callback triggered when the first video frame is rendered.
     *
     * After the startPlayingStream interface is called successfully, the SDK will receive this callback notification when it rendered the first frame of video  data.
     * You can use this callback to count time consuming that take the first frame time or update the playback stream.
     * @property {string} streamID - Stream ID
     */
    playerRenderVideoFirstFrame: (streamID: string) => void;
    /**
     * @event ZegoExpressEngine#onPlayerVideoSizeChanged
     * @desc The callback triggered when the stream playback resolution changes.
     *
     * If there is a change in the video resolution of the playing stream, the callback will be triggered, and the user can adjust the display for that stream dynamically.
     * If the publishing stream end triggers the internal stream flow control of SDK due to a network problem, the encoding resolution of the streaming end may be dynamically reduced, and this callback will also be received at this time.
     * If the stream is only audio data, the callback will not be received.
     * This callback will be triggered when the played audio and video stream is actually rendered to the set UI play canvas. You can use this callback notification to update or switch UI components that actually play the stream.
     * @property {string} streamID - Stream ID
     * @property {number} width - The width of the video
     * @property {number} height - The height of the video
     */
    playerVideoSizeChanged: (streamID: string, width: number, height: number) => void;
    /**
     * @event ZegoExpressEngine#onIMRecvBroadcastMessage
     * @desc The callback triggered when Broadcast Messages are received.
     *
     * This callback is used to receive broadcast messages sent by other users, and barrage messages sent by users themselves will not be notified through this callback.
     *
     * @property {string} roomID Room ID
     * @property {ZegoBroadcastMessageInfo[]} messageList list of received messages.
     */
    IMRecvBroadcastMessage: (roomID: string, messageList: ZegoBroadcastMessageInfo[]) => void;
    /**
     * @event ZegoExpressEngine#onIMRecvBarrageMessage
     * @desc The callback triggered when Barrage Messages are received.
     *
     * This callback is used to receive barrage messages sent by other users, and barrage messages sent by users themselves will not be notified through this callback.
     *
     * @property {string} roomID Room ID
     * @property {ZegoBarrageMessageInfo[]} messageList list of received messages.
     */
    IMRecvBarrageMessage: (roomID: string, messageList: ZegoBarrageMessageInfo[]) => void;
    /**
     * @event ZegoExpressEngine#onIMRecvCustomCommand
     * @desc The callback triggered when a Custom Command is received.
     *
     * This callback is used to receive custom signaling sent by other users, and barrage messages sent by users themselves will not be notified through this callback.
     *
     * @property {string} roomID Room ID
     * @property {ZegoUser} fromUser Sender of the command
     * @property {string} command Command content received
     */
    IMRecvCustomCommand: (roomID: string, fromUser: ZegoUser, command: string) => void;
    /**
     * @event ZegoExpressEngine#onMixerRelayCDNStateUpdate
     * @desc The callback triggered when the state of relayed streaming of the mixed stream to CDN changes.
     *
     * Description: The general situation of the mixing task on the ZEGO RTC server will push the output stream to the CDN using the RTMP protocol, and the state change during the push process will be notified from the callback function.
     * Use cases: It is often used when multiple video images are required to synthesize a video using mixed streaming, such as education, live teacher and student images.
     * When to trigger: After the developer calls the [startMixerTask] function to start mixing, when the ZEGO RTC server pushes the output stream to the CDN, there is a state change.
     * Restrictions: None.
     * Related callbacks: Develop can get the sound update notification of each single stream in the mixed stream through [OnMixerSoundLevelUpdate].
     * Related APIs: Develop can start a mixed flow task through [startMixerTask].
     *
     * @property {string} taskID The mixing task ID. Value range: the length does not exceed 256. Caution: This parameter is in string format and cannot contain URL keywords, such as `http` and `?` etc., otherwise the push and pull flow will fail. Only supports numbers, English characters and'~','!','@','$','%','^','&','*','(',')','_' ,'+','=','-','`',';',''',',','.','<','>','/','\'.
     * @property {ZegoStreamRelayCDNInfo[]} infoList List of information that the current CDN is being mixed.
     */
    mixerRelayCDNStateUpdate: (taskID: string, infoList: ZegoStreamRelayCDNInfo[]) => void;
    /**
     * @event ZegoExpressEngine#onMixerSoundLevelUpdate
     * @desc The callback triggered when the sound level of any input stream changes in the stream mixing process.
     *
     * Description: Developers can use this callback to display the effect of which stream’s anchor is talking on the UI interface of the mixed stream of the audience.
     * Use cases: It is often used when multiple video images are required to synthesize a video using mixed streaming, such as education, live teacher and student images.
     * When to trigger: After the developer calls the [startPlayingStream] function to start playing the mixed stream.
     * Restrictions: Due to the high frequency of this callback, please do not perform time-consuming tasks or UI operations in this callback to avoid stalling.
     * Related callbacks: [OnMixerRelayCDNStateUpdate] can be used to get update notification of mixing stream repost CDN status.
     * Related APIs: Develop can start a mixed flow task through [startMixerTask].
     *
     * @property {Map<string, number>} soundLevels The sound key-value pair of each single stream in the mixed stream, the key is the soundLevelID of each single stream, and the value is the sound value of the corresponding single stream. Value range: The value range of value is 0.0 ~ 100.0.
     */
    mixerSoundLevelUpdate: (soundLevels: Map<string, number>) => void;
    /**
     * @event ZegoExpressEngine#onAutoMixerSoundLevelUpdate
     * @desc The callback triggered when the sound level of any input stream changes in the auto stream mixing process.
     *
     * Description: According to this callback, user can obtain the sound level information of each stream pulled during auto stream mixing.
     * Use cases: Often used in voice chat room scenarios.Users can use this callback to show which streamer is speaking when an audience pulls a mixed stream.
     * Trigger: Call [startPlayingStream] function to pull the stream.
     * Related APIs: Users can call [startAutoMixerTask] function to start an auto stream mixing task.Users can call [stopAutoMixerTask] function to stop an auto stream mixing task.
     *
     * @property {Map<string, number>} soundLevels Sound level hash map, key is the streamID of every single stream in this mixer stream, value is the sound level value of that single stream, value ranging from 0.0 to 100.0.
     */
    autoMixerSoundLevelUpdate: (soundLevels: Map<string, number>) => void;
    /**
     * @event ZegoExpressEngine#onCapturedSoundLevelInfoUpdate
     * @desc The local captured audio sound level callback.
     *
     * Description: The local captured audio sound level callback.
     * Trigger: After you start the sound level monitor by calling [startSoundLevelMonitor].
     * Caution: The callback notification period is the parameter value set when the [startSoundLevelMonitor] is called.
     * Related APIs: Start sound level monitoring via [startSoundLevelMonitor]. Monitoring remote played audio sound level by callback [onRemoteSoundLevelInfoUpdate]
     *
     * @property {ZegoSoundLevelInfo} soundLevelInfo Locally captured sound level value, ranging from 0.0 to 100.0.
     */
    capturedSoundLevelInfoUpdate: (soundLevelInfo: ZegoSoundLevelInfo) => void;
    /**
     * @event ZegoExpressEngine#onRemoteSoundLevelInfoUpdate
     * @desc The remote playing streams audio sound level callback.
     *
     * Description: The remote playing streams audio sound level callback.
     * Trigger: After you start the sound level monitor by calling [startSoundLevelMonitor], you are in the state of playing the stream [startPlayingStream].
     * Caution: The callback notification period is the parameter value set when the [startSoundLevelMonitor] is called.
     * Related APIs: Start sound level monitoring via [startSoundLevelMonitor]. Monitoring local captured audio sound by callback [onCapturedSoundLevelUpdate] or [onCapturedSoundLevelInfoUpdate].
     *
     * @property {Map<String, ZegoSoundLevelInfo>} soundLevelInfos Remote sound level hash map, key is the streamID, value is the sound level value of the corresponding streamID, value ranging from 0.0 to 100.0.
     */
    remoteSoundLevelInfoUpdate: (soundLevelInfos: Map<String, ZegoSoundLevelInfo>) => void;
    /**
     * @event ZegoExpressEngine#onLocalDeviceExceptionOccurred
     * @desc The callback triggered when a local device exception occurred.
     *
     * Description: The callback triggered when a local device exception occurs.
     * Trigger: This callback is triggered when the function of the local audio or video device is abnormal.
     *
     * @property {ZegoDeviceExceptionType} exceptionType The type of the device exception.
     * @property {ZegoDeviceType} deviceType The type of device where the exception occurred.
     * @property {string} deviceID Device ID. Currently, only desktop devices are supported to distinguish different devices; for mobile devices, this parameter will return an empty string.
     */
    localDeviceExceptionOccurred: (exceptionType: ZegoDeviceExceptionType, deviceType: ZegoDeviceType, deviceID: string) => void;
    /**
     * @event ZegoExpressEngine#onRemoteCameraStateUpdate
     * @desc The callback triggered when the state of the remote camera changes.
     *
     * Description: The callback triggered when the state of the remote camera changes.
     * Use cases: Developers of 1v1 education scenarios or education small class scenarios and similar scenarios can use this callback notification to determine whether the camera device of the remote publishing stream device is working normally, and preliminary understand the cause of the device problem according to the corresponding state.
     * Trigger: When the state of the remote camera device changes, such as switching the camera, by monitoring this callback, it is possible to obtain an event related to the far-end camera, which can be used to prompt the user that the video may be abnormal.
     * Caution: This callback will not be called back when the remote stream is play from the CDN, or when custom video acquisition is used at the peer.
     *
     * @property {string} streamID Stream ID.
     * @property {ZegoRemoteDeviceState} state Remote camera status.
     */
    remoteCameraStateUpdate: (streamID: string, state: ZegoRemoteDeviceState) => void;
    /**
     * @event ZegoExpressEngine#onRemoteMicStateUpdate
     * @desc The callback triggered when the state of the remote microphone changes.
     *
     * Description: The callback triggered when the state of the remote microphone changes.
     * Use cases: Developers of 1v1 education scenarios or education small class scenarios and similar scenarios can use this callback notification to determine whether the microphone device of the remote publishing stream device is working normally, and preliminary understand the cause of the device problem according to the corresponding state.
     * Trigger: When the state of the remote microphone device is changed, such as switching a microphone, etc., by listening to the callback, it is possible to obtain an event related to the remote microphone, which can be used to prompt the user that the audio may be abnormal.
     * Caution: This callback will not be called back when the remote stream is play from the CDN, or when custom audio acquisition is used at the peer (But the stream is not published to the ZEGO RTC server.).
     *
     * @property {string} streamID Stream ID.
     * @property {ZegoRemoteDeviceState} state Remote microphone status.
     */
    remoteMicStateUpdate: (streamID: string, state: ZegoRemoteDeviceState) => void;
    /**
     * @event ZegoExpressEngine#onRemoteSpeakerStateUpdate
     * @desc The callback triggered when the state of the remote speaker changes.
     *
     * Description: The callback triggered when the state of the remote microphone changes.
     * Use cases: Developers of 1v1 education scenarios or education small class scenarios and similar scenarios can use this callback notification to determine whether the speaker device of the remote publishing stream device is working normally, and preliminary understand the cause of the device problem according to the corresponding state.
     * Trigger: When the state of the remote speaker device changes, such as switching the speaker, by monitoring this callback, you can get events related to the remote speaker.
     * Caution: This callback will not be called back when the remote stream is play from the CDN.
     *
     * @property {string} streamID Stream ID.
     * @property {ZegoRemoteDeviceState} state Remote speaker status.
     */
    remoteSpeakerStateUpdate: (streamID: string, state: ZegoRemoteDeviceState) => void;
    /**
     * @event ZegoExpressEngine#onAudioRouteChange
     * @desc Callback for device's audio route changed.
     *
     * Description: Callback for device's audio route changed.
     * Trigger: This callback will be called when there are changes in audio routing such as earphone plugging, speaker and receiver switching, etc.
     *
     * @property {ZegoAudioRoute} audioRoute Current audio route.
     */
    audioRouteChange: (audioRoute: ZegoAudioRoute) => void;
}
export interface ZegoMediaPlayerListener {
    /**
     * @event ZegoMediaPlayer#onMediaPlayerStateUpdate
     * @desc The callback triggered when the state of the media player changes.
     *
     * @property {ZegoMediaPlayer} mediaPlayer - MediaPlayer instance
     * @property {ZegoMediaPlayerState} state - Media player status
     * @property {number} errorCode - Error code, please refer to the Error Codes https://doc-en.zego.im/en/308.html for details
     */
    mediaPlayerStateUpdate: (mediaPlayer: ZegoMediaPlayer, state: ZegoMediaPlayerState, errorCode: number) => void;
    /**
     * @event ZegoMediaPlayer#onMediaPlayerNetworkEvent
     * @desc The callback triggered when the network status of the media player changes.
     *
     * @property {ZegoMediaPlayer} mediaPlayer - MediaPlayer instance
     * @property {ZegoMediaPlayerNetworkEvent} networkEvent - Network status event
     */
    mediaPlayerNetworkEvent: (mediaPlayer: ZegoMediaPlayer, networkEvent: ZegoMediaPlayerNetworkEvent) => void;
    /**
     * @event ZegoMediaPlayer#onMediaPlayerPlayingProgress
     * @desc The callback to report the current playback progress of the media player.
     *
     * @property {ZegoMediaPlayer} mediaPlayer - MediaPlayer instance
     * @property {number} millisecond - Progress in milliseconds
     */
    mediaPlayerPlayingProgress: (mediaPlayer: ZegoMediaPlayer, millisecond: number) => void;
}
