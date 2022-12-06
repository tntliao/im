/**
 * Application scenario.
 */
export var ZegoScenario;
(function (ZegoScenario) {
    /**
     * General scenario
     */
    ZegoScenario[ZegoScenario["General"] = 0] = "General";
    /**
     * Communication scenario
     */
    ZegoScenario[ZegoScenario["Communication"] = 1] = "Communication";
    /**
     * Live scenario
     */
    ZegoScenario[ZegoScenario["Live"] = 2] = "Live";
})(ZegoScenario || (ZegoScenario = {}));
/**
 * Language.
 */
export var ZegoLanguage;
(function (ZegoLanguage) {
    /**
     * English
     */
    ZegoLanguage[ZegoLanguage["English"] = 0] = "English";
    /**
     * Chinese
     */
    ZegoLanguage[ZegoLanguage["Chinese"] = 1] = "Chinese";
})(ZegoLanguage || (ZegoLanguage = {}));
export var ZegoOrientation;
(function (ZegoOrientation) {
    ZegoOrientation[ZegoOrientation["PortraitUp"] = 0] = "PortraitUp";
    ZegoOrientation[ZegoOrientation["LandscapeLeft"] = 1] = "LandscapeLeft";
    ZegoOrientation[ZegoOrientation["PortraitDown"] = 2] = "PortraitDown";
    ZegoOrientation[ZegoOrientation["LandscapeRight"] = 3] = "LandscapeRight";
})(ZegoOrientation || (ZegoOrientation = {}));
/**
 * Engine state.
 */
export var ZegoEngineState;
(function (ZegoEngineState) {
    /**
     * The engine has started
     */
    ZegoEngineState[ZegoEngineState["Start"] = 0] = "Start";
    /**
     * The engine has stoped
     */
    ZegoEngineState[ZegoEngineState["Stop"] = 1] = "Stop";
})(ZegoEngineState || (ZegoEngineState = {}));
/**
 * Room state.
 */
export var ZegoRoomState;
(function (ZegoRoomState) {
    /**
     * Unconnected state, enter this state before logging in and after exiting the room. If there is a steady state abnormality in the process of logging in to the room, such as AppID and AppSign are incorrect, or if the same user name is logged in elsewhere and the local end is KickOut, it will enter this state.
     */
    ZegoRoomState[ZegoRoomState["DisConnected"] = 0] = "DisConnected";
    /**
     * The state that the connection is being requested. It will enter this state after successful execution login room function. The display of the UI is usually performed using this state. If the connection is interrupted due to poor network quality, the SDK will perform an internal retry and will return to the requesting connection status.
     */
    ZegoRoomState[ZegoRoomState["Connecting"] = 1] = "Connecting";
    /**
     * The status that is successfully connected. Entering this status indicates that the login to the room has been successful. The user can receive the callback notification of the user and the stream information in the room.
     */
    ZegoRoomState[ZegoRoomState["Connected"] = 2] = "Connected";
})(ZegoRoomState || (ZegoRoomState = {}));
/** Room mode. */
export var ZegoRoomMode;
(function (ZegoRoomMode) {
    /** Single room mode. */
    ZegoRoomMode[ZegoRoomMode["SingleRoom"] = 0] = "SingleRoom";
    /** Multiple room mode. */
    ZegoRoomMode[ZegoRoomMode["MultiRoom"] = 1] = "MultiRoom";
})(ZegoRoomMode || (ZegoRoomMode = {}));
/**
 * Publish channel.
 */
export var ZegoPublishChannel;
(function (ZegoPublishChannel) {
    /**
     * Main publish channel
     */
    ZegoPublishChannel[ZegoPublishChannel["Main"] = 0] = "Main";
    /**
     * Auxiliary publish channel
     */
    ZegoPublishChannel[ZegoPublishChannel["Aux"] = 1] = "Aux";
})(ZegoPublishChannel || (ZegoPublishChannel = {}));
/**
 * Publish stream status.
 */
export var ZegoPublisherState;
(function (ZegoPublisherState) {
    /**
     * The state is not published, and it is in this state before publishing the stream. If a steady-state exception occurs in the publish process, such as AppID and AppSign are incorrect, or if other users are already publishing the stream, there will be a failure and enter this state.
     */
    ZegoPublisherState[ZegoPublisherState["NoPublish"] = 0] = "NoPublish";
    /**
     * The state that it is requesting to publish the stream after the [startPublishingStream] function is successfully called. The UI is usually displayed through this state. If the connection is interrupted due to poor network quality, the SDK will perform an internal retry and will return to the requesting state.
     */
    ZegoPublisherState[ZegoPublisherState["PublishRequesting"] = 1] = "PublishRequesting";
    /**
     * The state that the stream is being published, entering the state indicates that the stream has been successfully published, and the user can communicate normally.
     */
    ZegoPublisherState[ZegoPublisherState["Publishing"] = 2] = "Publishing";
})(ZegoPublisherState || (ZegoPublisherState = {}));
/**
 * Video rendering fill mode.
 */
export var ZegoViewMode;
(function (ZegoViewMode) {
    /**
     * The proportional scaling up, there may be black borders
     */
    ZegoViewMode[ZegoViewMode["AspectFit"] = 0] = "AspectFit";
    /**
     * The proportional zoom fills the entire View and may be partially cut
     */
    ZegoViewMode[ZegoViewMode["AspectFill"] = 1] = "AspectFill";
    /**
     * Fill the entire view, the image may be stretched
     */
    ZegoViewMode[ZegoViewMode["ScaleToFill"] = 2] = "ScaleToFill";
})(ZegoViewMode || (ZegoViewMode = {}));
/**
 * Mirror mode for previewing or playing the of the stream.
 */
export var ZegoVideoMirrorMode;
(function (ZegoVideoMirrorMode) {
    /**
     * The mirror image only for previewing locally. This mode is used by default.
     */
    ZegoVideoMirrorMode[ZegoVideoMirrorMode["OnlyPreviewMirror"] = 0] = "OnlyPreviewMirror";
    /**
     * Both the video previewed locally and the far end playing the stream will see mirror image.
     */
    ZegoVideoMirrorMode[ZegoVideoMirrorMode["BothMirror"] = 1] = "BothMirror";
    /**
     * Both the video previewed locally and the far end playing the stream will not see mirror image.
     */
    ZegoVideoMirrorMode[ZegoVideoMirrorMode["NoMirror"] = 2] = "NoMirror";
    /**
     * The mirror image only for far end playing the stream.
     */
    ZegoVideoMirrorMode[ZegoVideoMirrorMode["OnlyPublishMirror"] = 3] = "OnlyPublishMirror";
})(ZegoVideoMirrorMode || (ZegoVideoMirrorMode = {}));
/// SEI type
export var ZegoSEIType;
(function (ZegoSEIType) {
    /// Using H.264 SEI (nalu type = 6, payload type = 243) type packaging, this type is not specified by the SEI standard, there is no conflict with the video encoder or the SEI in the video file, users do not need to follow the SEI content Do filtering, SDK uses this type by default.
    ZegoSEIType[ZegoSEIType["ZegoDefined"] = 0] = "ZegoDefined";
    /// SEI (nalu type = 6, payload type = 5) of H.264 is used for packaging. The H.264 standard has a prescribed format for this type: startcode + nalu type (6) + payload type (5) + len + payload (uuid + content) + trailing bits. Because the video encoder itself generates an SEI with a payload type of 5, or when a video file is used for streaming, such SEI may also exist in the video file, so when using this type, the user needs to use uuid + context as a buffer sending SEI. At this time, in order to distinguish the SEI generated by the video encoder itself, when the App sends this type of SEI, it can fill in the service-specific uuid (uuid length is 16 bytes). When the receiver uses the SDK to parse the SEI of the payload type 5, it will set filter string filters out the SEI matching the uuid and throws it to the business. If the filter string is not set, the SDK will throw all received SEI to the developer. uuid filter string setting function, [ZegoEngineConfig.advancedConfig("unregister_sei_filter","XXXXXX")], where unregister_sei_filter is the key, and XXXXX is the uuid filter string to be set.
    ZegoSEIType[ZegoSEIType["UserUnregister"] = 1] = "UserUnregister";
})(ZegoSEIType || (ZegoSEIType = {}));
/// Voice changer preset value.
export var ZegoVoiceChangerPreset;
(function (ZegoVoiceChangerPreset) {
    /// No Voice changer
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["None"] = 0] = "None";
    /// Male to child voice (loli voice effect)
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["MenToChild"] = 1] = "MenToChild";
    /// Male to female voice (kindergarten voice effect)
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["MenToWomen"] = 2] = "MenToWomen";
    /// Female to child voice
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["WomenToChild"] = 3] = "WomenToChild";
    /// Female to male voice
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["WomenToMen"] = 4] = "WomenToMen";
    /// Foreigner voice effect
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["Foreigner"] = 5] = "Foreigner";
    /// Autobot Optimus Prime voice effect
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["OptimusPrime"] = 6] = "OptimusPrime";
    /// Android robot voice effect
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["Android"] = 7] = "Android";
    /// Ethereal voice effect
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["Ethereal"] = 8] = "Ethereal";
    /// Magnetic(Male) voice effect
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["MaleMagnetic"] = 9] = "MaleMagnetic";
    /// Fresh(Female) voice effect
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["FemaleFresh"] = 10] = "FemaleFresh";
})(ZegoVoiceChangerPreset || (ZegoVoiceChangerPreset = {}));
/// Reverberation preset value.
export var ZegoReverbPreset;
(function (ZegoReverbPreset) {
    /// No Reverberation
    ZegoReverbPreset[ZegoReverbPreset["None"] = 0] = "None";
    /// Soft room reverb effect
    ZegoReverbPreset[ZegoReverbPreset["SoftRoom"] = 1] = "SoftRoom";
    /// Large room reverb effect
    ZegoReverbPreset[ZegoReverbPreset["LargeRoom"] = 2] = "LargeRoom";
    /// Concer hall reverb effect
    ZegoReverbPreset[ZegoReverbPreset["ConcerHall"] = 3] = "ConcerHall";
    /// Valley reverb effect
    ZegoReverbPreset[ZegoReverbPreset["Valley"] = 4] = "Valley";
    /// Recording studio reverb effect
    ZegoReverbPreset[ZegoReverbPreset["RecordingStudio"] = 5] = "RecordingStudio";
    /// Basement reverb effect
    ZegoReverbPreset[ZegoReverbPreset["Basement"] = 6] = "Basement";
    /// KTV reverb effect
    ZegoReverbPreset[ZegoReverbPreset["KTV"] = 7] = "KTV";
    /// Popular reverb effect
    ZegoReverbPreset[ZegoReverbPreset["Popular"] = 8] = "Popular";
    /// Rock reverb effect
    ZegoReverbPreset[ZegoReverbPreset["Rock"] = 9] = "Rock";
    /// Vocal concert reverb effect
    ZegoReverbPreset[ZegoReverbPreset["VocalConcert"] = 10] = "VocalConcert";
})(ZegoReverbPreset || (ZegoReverbPreset = {}));
/**
 * Video configuration resolution and bitrate preset enumeration. The preset resolutions are adapted for mobile and desktop. On mobile, height is longer than width, and desktop is the opposite. For example, 1080p is actually 1080(w) x 1920(h) on mobile and 1920(w) x 1080(h) on desktop.
 */
export var ZegoVideoConfigPreset;
(function (ZegoVideoConfigPreset) {
    /**
     * Set the resolution to 320x180, the default is 15 fps, the code rate is 300 kbps
     */
    ZegoVideoConfigPreset[ZegoVideoConfigPreset["Preset180P"] = 0] = "Preset180P";
    /**
     * Set the resolution to 480x270, the default is 15 fps, the code rate is 400 kbps
     */
    ZegoVideoConfigPreset[ZegoVideoConfigPreset["Preset270P"] = 1] = "Preset270P";
    /**
     * Set the resolution to 640x360, the default is 15 fps, the code rate is 600 kbps
     */
    ZegoVideoConfigPreset[ZegoVideoConfigPreset["Preset360P"] = 2] = "Preset360P";
    /**
     * Set the resolution to 960x540, the default is 15 fps, the code rate is 1200 kbps
     */
    ZegoVideoConfigPreset[ZegoVideoConfigPreset["Preset540P"] = 3] = "Preset540P";
    /**
     * Set the resolution to 1280x720, the default is 15 fps, the code rate is 1500 kbps
     */
    ZegoVideoConfigPreset[ZegoVideoConfigPreset["Preset720P"] = 4] = "Preset720P";
    /**
     * Set the resolution to 1920x1080, the default is 15 fps, the code rate is 3000 kbps
     */
    ZegoVideoConfigPreset[ZegoVideoConfigPreset["Preset1080P"] = 5] = "Preset1080P";
})(ZegoVideoConfigPreset || (ZegoVideoConfigPreset = {}));
/**
 * Stream quality level.
 */
export var ZegoStreamQualityLevel;
(function (ZegoStreamQualityLevel) {
    /**
     * Excellent
     */
    ZegoStreamQualityLevel[ZegoStreamQualityLevel["Excellent"] = 0] = "Excellent";
    /**
     * Good
     */
    ZegoStreamQualityLevel[ZegoStreamQualityLevel["Good"] = 1] = "Good";
    /**
     * Normal
     */
    ZegoStreamQualityLevel[ZegoStreamQualityLevel["Medium"] = 2] = "Medium";
    /**
     * Bad
     */
    ZegoStreamQualityLevel[ZegoStreamQualityLevel["Bad"] = 3] = "Bad";
    /**
     * Failed
     */
    ZegoStreamQualityLevel[ZegoStreamQualityLevel["Die"] = 4] = "Die";
})(ZegoStreamQualityLevel || (ZegoStreamQualityLevel = {}));
/// Audio channel type.
export var ZegoAudioChannel;
(function (ZegoAudioChannel) {
    /// Unknown
    ZegoAudioChannel[ZegoAudioChannel["Unknown"] = 0] = "Unknown";
    /// Mono
    ZegoAudioChannel[ZegoAudioChannel["Mono"] = 1] = "Mono";
    /// Stereo
    ZegoAudioChannel[ZegoAudioChannel["Stereo"] = 2] = "Stereo";
})(ZegoAudioChannel || (ZegoAudioChannel = {}));
/// Audio capture stereo mode.
export var ZegoAudioCaptureStereoMode;
(function (ZegoAudioCaptureStereoMode) {
    /// Disable capture stereo, i.e. capture mono
    ZegoAudioCaptureStereoMode[ZegoAudioCaptureStereoMode["None"] = 0] = "None";
    /// Always enable capture stereo
    ZegoAudioCaptureStereoMode[ZegoAudioCaptureStereoMode["Always"] = 1] = "Always";
    /// Adaptive mode, capture stereo when publishing stream only, capture mono when publishing and playing stream (e.g. talk/intercom scenes)
    ZegoAudioCaptureStereoMode[ZegoAudioCaptureStereoMode["Adaptive"] = 2] = "Adaptive";
})(ZegoAudioCaptureStereoMode || (ZegoAudioCaptureStereoMode = {}));
/// Audio mix mode.
export var ZegoAudioMixMode;
(function (ZegoAudioMixMode) {
    /// Default mode, no special behavior
    ZegoAudioMixMode[ZegoAudioMixMode["Raw"] = 0] = "Raw";
    /// Audio focus mode, which can highlight the sound of a certain stream in multiple audio streams
    ZegoAudioMixMode[ZegoAudioMixMode["Focused"] = 1] = "Focused";
})(ZegoAudioMixMode || (ZegoAudioMixMode = {}));
/// Audio Codec ID.
export var ZegoAudioCodecID;
(function (ZegoAudioCodecID) {
    /// default
    ZegoAudioCodecID[ZegoAudioCodecID["Default"] = 0] = "Default";
    /// Normal
    ZegoAudioCodecID[ZegoAudioCodecID["Normal"] = 1] = "Normal";
    /// Normal2
    ZegoAudioCodecID[ZegoAudioCodecID["Normal2"] = 2] = "Normal2";
    /// Normal3
    ZegoAudioCodecID[ZegoAudioCodecID["Normal3"] = 3] = "Normal3";
    /// Low
    ZegoAudioCodecID[ZegoAudioCodecID["Low"] = 4] = "Low";
    /// Low2
    ZegoAudioCodecID[ZegoAudioCodecID["Low2"] = 5] = "Low2";
    /// Low3
    ZegoAudioCodecID[ZegoAudioCodecID["Low3"] = 6] = "Low3";
})(ZegoAudioCodecID || (ZegoAudioCodecID = {}));
/**
 * Video codec ID.
 */
export var ZegoVideoCodecID;
(function (ZegoVideoCodecID) {
    /**
     * Default (H.264)
     */
    ZegoVideoCodecID[ZegoVideoCodecID["Default"] = 0] = "Default";
    /**
     * Scalable Video Coding (H.264 SVC)
     */
    ZegoVideoCodecID[ZegoVideoCodecID["SVC"] = 1] = "SVC";
    /**
     * VP8
     */
    ZegoVideoCodecID[ZegoVideoCodecID["VP8"] = 2] = "VP8";
    /**
     * H.265
     */
    ZegoVideoCodecID[ZegoVideoCodecID["H265"] = 3] = "H265";
})(ZegoVideoCodecID || (ZegoVideoCodecID = {}));
/**
 * Player video layer.
 */
export var ZegoPlayerVideoLayer;
(function (ZegoPlayerVideoLayer) {
    /**
     * The layer to be played depends on the network status
     */
    ZegoPlayerVideoLayer[ZegoPlayerVideoLayer["Auto"] = 0] = "Auto";
    /**
     * Play the base layer (small resolution)
     */
    ZegoPlayerVideoLayer[ZegoPlayerVideoLayer["Base"] = 1] = "Base";
    /**
     * Play the extend layer (big resolution)
     */
    ZegoPlayerVideoLayer[ZegoPlayerVideoLayer["BaseExtend"] = 2] = "BaseExtend";
})(ZegoPlayerVideoLayer || (ZegoPlayerVideoLayer = {}));
/**
 * Video stream type
 */
export var ZegoVideoStreamType;
(function (ZegoVideoStreamType) {
    /**
     * The type to be played depends on the network status
     */
    ZegoVideoStreamType[ZegoVideoStreamType["Default"] = 0] = "Default";
    /**
     * small resolution type
     */
    ZegoVideoStreamType[ZegoVideoStreamType["Small"] = 1] = "Small";
    /**
     * big resolution type
     */
    ZegoVideoStreamType[ZegoVideoStreamType["Big"] = 2] = "Big";
})(ZegoVideoStreamType || (ZegoVideoStreamType = {}));
/// Audio echo cancellation mode.
export var ZegoAECMode;
(function (ZegoAECMode) {
    /// Aggressive echo cancellation may affect the sound quality slightly, but the echo will be very clean
    ZegoAECMode[ZegoAECMode["Aggressive"] = 0] = "Aggressive";
    /// Moderate echo cancellation, which may slightly affect a little bit of sound, but the residual echo will be less
    ZegoAECMode[ZegoAECMode["Medium"] = 1] = "Medium";
    /// Comfortable echo cancellation, that is, echo cancellation does not affect the sound quality of the sound, and sometimes there may be a little echo, but it will not affect the normal listening.
    ZegoAECMode[ZegoAECMode["Soft"] = 2] = "Soft";
})(ZegoAECMode || (ZegoAECMode = {}));
/// Active Noise Suppression mode.
export var ZegoANSMode;
(function (ZegoANSMode) {
    /// Soft ANS
    ZegoANSMode[ZegoANSMode["Soft"] = 0] = "Soft";
    /// Medium ANS
    ZegoANSMode[ZegoANSMode["Medium"] = 1] = "Medium";
    /// Aggressive ANS
    ZegoANSMode[ZegoANSMode["Aggressive"] = 2] = "Aggressive";
})(ZegoANSMode || (ZegoANSMode = {}));
/**
 * Traffic control property (bitmask enumeration).
 */
export var ZegoTrafficControlProperty;
(function (ZegoTrafficControlProperty) {
    /**
     * Basic
     */
    ZegoTrafficControlProperty[ZegoTrafficControlProperty["Basic"] = 0] = "Basic";
    /**
     * Adaptive FPS
     */
    ZegoTrafficControlProperty[ZegoTrafficControlProperty["AdaptiveFPS"] = 1] = "AdaptiveFPS";
    /**
     * Adaptive resolution
     */
    ZegoTrafficControlProperty[ZegoTrafficControlProperty["AdaptiveResolution"] = 2] = "AdaptiveResolution";
    /**
     * Adaptive Audio bitrate
     */
    ZegoTrafficControlProperty[ZegoTrafficControlProperty["AdaptiveAudioBitrate"] = 4] = "AdaptiveAudioBitrate";
})(ZegoTrafficControlProperty || (ZegoTrafficControlProperty = {}));
/**
 * Video transmission mode when current bitrate is lower than the set minimum bitrate.
 */
export var ZegoTrafficControlMinVideoBitrateMode;
(function (ZegoTrafficControlMinVideoBitrateMode) {
    /**
     * Stop video transmission when current bitrate is lower than the set minimum bitrate
     */
    ZegoTrafficControlMinVideoBitrateMode[ZegoTrafficControlMinVideoBitrateMode["NoVideo"] = 0] = "NoVideo";
    /**
     * Video is sent at a very low frequency (no more than 2fps) which is lower than the set minimum bitrate
     */
    ZegoTrafficControlMinVideoBitrateMode[ZegoTrafficControlMinVideoBitrateMode["UltraLowFPS"] = 1] = "UltraLowFPS";
})(ZegoTrafficControlMinVideoBitrateMode || (ZegoTrafficControlMinVideoBitrateMode = {}));
/**
 * Factors that trigger traffic control
 */
export var ZegoTrafficControlFocusOnMode;
(function (ZegoTrafficControlFocusOnMode) {
    /**
     * Focus only on the local network
     */
    ZegoTrafficControlFocusOnMode[ZegoTrafficControlFocusOnMode["LocalOnly"] = 0] = "LocalOnly";
    /**
     * Pay attention to the local network, but also take into account the remote network, currently only effective in the 1v1 scenario
     */
    ZegoTrafficControlFocusOnMode[ZegoTrafficControlFocusOnMode["Remote"] = 1] = "Remote";
})(ZegoTrafficControlFocusOnMode || (ZegoTrafficControlFocusOnMode = {}));
/**
 * Playing stream status.
 */
export var ZegoPlayerState;
(function (ZegoPlayerState) {
    /**
     * The state of the flow is not played, and it is in this state before the stream is played. If the steady flow anomaly occurs during the playing process, such as AppID and AppSign are incorrect, it will enter this state.
     */
    ZegoPlayerState[ZegoPlayerState["NoPlay"] = 0] = "NoPlay";
    /**
     * The state that the stream is being requested for playing. After the [startPlayingStream] function is successfully called, it will enter the state. The UI is usually displayed through this state. If the connection is interrupted due to poor network quality, the SDK will perform an internal retry and will return to the requesting state.
     */
    ZegoPlayerState[ZegoPlayerState["PlayRequesting"] = 1] = "PlayRequesting";
    /**
     * The state that the stream is being playing, entering the state indicates that the stream has been successfully played, and the user can communicate normally.
     */
    ZegoPlayerState[ZegoPlayerState["Playing"] = 2] = "Playing";
})(ZegoPlayerState || (ZegoPlayerState = {}));
/**
 * Media event when playing.
 */
export var ZegoPlayerMediaEvent;
(function (ZegoPlayerMediaEvent) {
    /**
     * Audio stuck event when playing
     */
    ZegoPlayerMediaEvent[ZegoPlayerMediaEvent["AudioBreakOccur"] = 0] = "AudioBreakOccur";
    /**
     * Audio stuck event recovery when playing
     */
    ZegoPlayerMediaEvent[ZegoPlayerMediaEvent["AudioBreakResume"] = 1] = "AudioBreakResume";
    /**
     * Video stuck event when playing
     */
    ZegoPlayerMediaEvent[ZegoPlayerMediaEvent["VideoBreakOccur"] = 2] = "VideoBreakOccur";
    /**
     * Video stuck event recovery when playing
     */
    ZegoPlayerMediaEvent[ZegoPlayerMediaEvent["VideoBreakResume"] = 3] = "VideoBreakResume";
})(ZegoPlayerMediaEvent || (ZegoPlayerMediaEvent = {}));
/**
 * Stream Resource Mode
 */
export var ZegoStreamResourceMode;
(function (ZegoStreamResourceMode) {
    /**
     * Default mode. The SDK will automatically select the streaming resource according to the cdnConfig parameters set by the player config and the ready-made background configuration.
     */
    ZegoStreamResourceMode[ZegoStreamResourceMode["Default"] = 0] = "Default";
    /**
     * Playing stream only from CDN.
     */
    ZegoStreamResourceMode[ZegoStreamResourceMode["OnlyCDN"] = 1] = "OnlyCDN";
    /**
     * Playing stream only from L3.
     */
    ZegoStreamResourceMode[ZegoStreamResourceMode["OnlyL3"] = 2] = "OnlyL3";
    /**
     * Playing stream only from RTC.
     */
    ZegoStreamResourceMode[ZegoStreamResourceMode["OnlyRTC"] = 3] = "OnlyRTC";
})(ZegoStreamResourceMode || (ZegoStreamResourceMode = {}));
/**
 * Update type.
 */
export var ZegoUpdateType;
(function (ZegoUpdateType) {
    /**
     * Add
     */
    ZegoUpdateType[ZegoUpdateType["Add"] = 0] = "Add";
    /**
     * Delete
     */
    ZegoUpdateType[ZegoUpdateType["Delete"] = 1] = "Delete";
})(ZegoUpdateType || (ZegoUpdateType = {}));
/// State of CDN relay.
export var ZegoStreamRelayCDNState;
(function (ZegoStreamRelayCDNState) {
    /// The state indicates that there is no CDN relay
    ZegoStreamRelayCDNState[ZegoStreamRelayCDNState["NoRelay"] = 0] = "NoRelay";
    /// The CDN relay is being requested
    ZegoStreamRelayCDNState[ZegoStreamRelayCDNState["RelayRequesting"] = 1] = "RelayRequesting";
    /// Entering this status indicates that the CDN relay has been successful
    ZegoStreamRelayCDNState[ZegoStreamRelayCDNState["Relaying"] = 2] = "Relaying";
})(ZegoStreamRelayCDNState || (ZegoStreamRelayCDNState = {}));
/// Reason for state of CDN relay changed.
export var ZegoStreamRelayCDNUpdateReason;
(function (ZegoStreamRelayCDNUpdateReason) {
    /// No error
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["None"] = 0] = "None";
    /// Server error
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["ServerError"] = 1] = "ServerError";
    /// Handshake error
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["HandshakeFailed"] = 2] = "HandshakeFailed";
    /// Access point error
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["AccessPointError"] = 3] = "AccessPointError";
    /// Stream create failure
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["CreateStreamFailed"] = 4] = "CreateStreamFailed";
    /// Bad name
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["BadName"] = 5] = "BadName";
    /// CDN server actively disconnected
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["CDNServerDisconnected"] = 6] = "CDNServerDisconnected";
    /// Active disconnect
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["Disconnected"] = 7] = "Disconnected";
    /// All mixer input streams sessions closed
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["MixStreamAllInputStreamClosed"] = 8] = "MixStreamAllInputStreamClosed";
    /// All mixer input streams have no data
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["MixStreamAllInputStreamNoData"] = 9] = "MixStreamAllInputStreamNoData";
    /// Internal error of stream mixer server
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["MixStreamServerInternalError"] = 10] = "MixStreamServerInternalError";
})(ZegoStreamRelayCDNUpdateReason || (ZegoStreamRelayCDNUpdateReason = {}));
/// Audio device type.
export var ZegoAudioDeviceType;
(function (ZegoAudioDeviceType) {
    /// Audio input type
    ZegoAudioDeviceType[ZegoAudioDeviceType["Input"] = 0] = "Input";
    /// Audio output type
    ZegoAudioDeviceType[ZegoAudioDeviceType["Output"] = 1] = "Output";
})(ZegoAudioDeviceType || (ZegoAudioDeviceType = {}));
/**  Audio route */
export var ZegoAudioRoute;
(function (ZegoAudioRoute) {
    /** Speaker */
    ZegoAudioRoute[ZegoAudioRoute["Speaker"] = 0] = "Speaker";
    /** Headphone */
    ZegoAudioRoute[ZegoAudioRoute["Headphone"] = 1] = "Headphone";
    /** Bluetooth device */
    ZegoAudioRoute[ZegoAudioRoute["Bluetooth"] = 2] = "Bluetooth";
    /** Receiver */
    ZegoAudioRoute[ZegoAudioRoute["Receiver"] = 3] = "Receiver";
    /** External USB audio device */
    ZegoAudioRoute[ZegoAudioRoute["ExternalUSB"] = 4] = "ExternalUSB";
    /** Apple AirPlay */
    ZegoAudioRoute[ZegoAudioRoute["AirPlay"] = 5] = "AirPlay";
})(ZegoAudioRoute || (ZegoAudioRoute = {}));
/// Mix stream content type.
export var ZegoMixerInputContentType;
(function (ZegoMixerInputContentType) {
    /// Mix stream for audio only
    ZegoMixerInputContentType[ZegoMixerInputContentType["Audio"] = 0] = "Audio";
    /// Mix stream for both audio and video
    ZegoMixerInputContentType[ZegoMixerInputContentType["Video"] = 1] = "Video";
})(ZegoMixerInputContentType || (ZegoMixerInputContentType = {}));
/// Capture pipeline scale mode.
export var ZegoCapturePipelineScaleMode;
(function (ZegoCapturePipelineScaleMode) {
    /// Zoom immediately after acquisition, default
    ZegoCapturePipelineScaleMode[ZegoCapturePipelineScaleMode["Pre"] = 0] = "Pre";
    /// Scaling while encoding
    ZegoCapturePipelineScaleMode[ZegoCapturePipelineScaleMode["Post"] = 1] = "Post";
})(ZegoCapturePipelineScaleMode || (ZegoCapturePipelineScaleMode = {}));
/// Video frame format.
export var ZegoVideoFrameFormat;
(function (ZegoVideoFrameFormat) {
    /// Unknown format, will take platform default
    ZegoVideoFrameFormat[ZegoVideoFrameFormat["Unknown"] = 0] = "Unknown";
    /// I420 (YUV420Planar) format
    ZegoVideoFrameFormat[ZegoVideoFrameFormat["I420"] = 1] = "I420";
    /// NV12 (YUV420SemiPlanar) format
    ZegoVideoFrameFormat[ZegoVideoFrameFormat["NV12"] = 2] = "NV12";
    /// NV21 (YUV420SemiPlanar) format
    ZegoVideoFrameFormat[ZegoVideoFrameFormat["NV21"] = 3] = "NV21";
    /// BGRA32 format
    ZegoVideoFrameFormat[ZegoVideoFrameFormat["BGRA32"] = 4] = "BGRA32";
    /// RGBA32 format
    ZegoVideoFrameFormat[ZegoVideoFrameFormat["RGBA32"] = 5] = "RGBA32";
    /// ARGB32 format
    ZegoVideoFrameFormat[ZegoVideoFrameFormat["ARGB32"] = 6] = "ARGB32";
    /// ABGR32 format
    ZegoVideoFrameFormat[ZegoVideoFrameFormat["ABGR32"] = 7] = "ABGR32";
    /// I422 (YUV422Planar) format
    ZegoVideoFrameFormat[ZegoVideoFrameFormat["I422"] = 8] = "I422";
})(ZegoVideoFrameFormat || (ZegoVideoFrameFormat = {}));
/// Video encoded frame format.
export var ZegoVideoEncodedFrameFormat;
(function (ZegoVideoEncodedFrameFormat) {
    /// AVC AVCC format
    ZegoVideoEncodedFrameFormat[ZegoVideoEncodedFrameFormat["AVCC"] = 0] = "AVCC";
    /// AVC Annex-B format
    ZegoVideoEncodedFrameFormat[ZegoVideoEncodedFrameFormat["AnnexB"] = 1] = "AnnexB";
})(ZegoVideoEncodedFrameFormat || (ZegoVideoEncodedFrameFormat = {}));
/// Video frame buffer type.
export var ZegoVideoBufferType;
(function (ZegoVideoBufferType) {
    /// Raw data type video frame
    ZegoVideoBufferType[ZegoVideoBufferType["Unknown"] = 0] = "Unknown";
    /// Raw data type video frame
    ZegoVideoBufferType[ZegoVideoBufferType["RawData"] = 1] = "RawData";
    /// Encoded data type video frame
    ZegoVideoBufferType[ZegoVideoBufferType["EncodedData"] = 2] = "EncodedData";
    /// Texture 2D type video frame
    ZegoVideoBufferType[ZegoVideoBufferType["GLTexture2D"] = 3] = "GLTexture2D";
    /// CVPixelBuffer type video frame
    ZegoVideoBufferType[ZegoVideoBufferType["CVPixelBuffer"] = 4] = "CVPixelBuffer";
})(ZegoVideoBufferType || (ZegoVideoBufferType = {}));
/// Video frame format series.
export var ZegoVideoFrameFormatSeries;
(function (ZegoVideoFrameFormatSeries) {
    /// RGB series
    ZegoVideoFrameFormatSeries[ZegoVideoFrameFormatSeries["RGB"] = 0] = "RGB";
    /// YUV series
    ZegoVideoFrameFormatSeries[ZegoVideoFrameFormatSeries["YUV"] = 1] = "YUV";
})(ZegoVideoFrameFormatSeries || (ZegoVideoFrameFormatSeries = {}));
/// Video frame flip mode.
export var ZegoVideoFlipMode;
(function (ZegoVideoFlipMode) {
    /// No flip
    ZegoVideoFlipMode[ZegoVideoFlipMode["None"] = 0] = "None";
    /// X-axis flip
    ZegoVideoFlipMode[ZegoVideoFlipMode["X"] = 1] = "X";
    /// Y-axis flip
    ZegoVideoFlipMode[ZegoVideoFlipMode["Y"] = 2] = "Y";
    /// X-Y-axis flip
    ZegoVideoFlipMode[ZegoVideoFlipMode["XY"] = 3] = "XY";
})(ZegoVideoFlipMode || (ZegoVideoFlipMode = {}));
/// Customize the audio processing configuration type.
export var ZegoCustomAudioProcessType;
(function (ZegoCustomAudioProcessType) {
    /// Remote audio processing
    ZegoCustomAudioProcessType[ZegoCustomAudioProcessType["Remote"] = 0] = "Remote";
    /// Capture audio processing
    ZegoCustomAudioProcessType[ZegoCustomAudioProcessType["Capture"] = 1] = "Capture";
    /// Remote audio and capture audio processing
    ZegoCustomAudioProcessType[ZegoCustomAudioProcessType["CaptureAndRemote"] = 2] = "CaptureAndRemote";
})(ZegoCustomAudioProcessType || (ZegoCustomAudioProcessType = {}));
/** Audio Config Preset. */
export var ZegoAudioConfigPreset;
(function (ZegoAudioConfigPreset) {
    /** Basic sound quality (16 kbps, Mono, ZegoAudioCodecIDDefault) */
    ZegoAudioConfigPreset[ZegoAudioConfigPreset["BasicQuality"] = 0] = "BasicQuality";
    /** Standard sound quality (48 kbps, Mono, ZegoAudioCodecIDDefault) */
    ZegoAudioConfigPreset[ZegoAudioConfigPreset["StandardQuality"] = 1] = "StandardQuality";
    /** Standard sound quality (56 kbps, Stereo, ZegoAudioCodecIDDefault) */
    ZegoAudioConfigPreset[ZegoAudioConfigPreset["StandardQualityStereo"] = 2] = "StandardQualityStereo";
    /** High sound quality (128 kbps, Mono, ZegoAudioCodecIDDefault) */
    ZegoAudioConfigPreset[ZegoAudioConfigPreset["HighQuality"] = 3] = "HighQuality";
    /** High sound quality (192 kbps, Stereo, ZegoAudioCodecIDDefault) */
    ZegoAudioConfigPreset[ZegoAudioConfigPreset["HighQualityStereo"] = 4] = "HighQualityStereo";
})(ZegoAudioConfigPreset || (ZegoAudioConfigPreset = {}));
/**
 * Player state.
 */
export var ZegoMediaPlayerState;
(function (ZegoMediaPlayerState) {
    /**
     * Not playing
     */
    ZegoMediaPlayerState[ZegoMediaPlayerState["NoPlay"] = 0] = "NoPlay";
    /**
     * Playing
     */
    ZegoMediaPlayerState[ZegoMediaPlayerState["Playing"] = 1] = "Playing";
    /**
     * Pausing
     */
    ZegoMediaPlayerState[ZegoMediaPlayerState["Pausing"] = 2] = "Pausing";
    /**
     * End of play
     */
    ZegoMediaPlayerState[ZegoMediaPlayerState["PlayEnded"] = 3] = "PlayEnded";
})(ZegoMediaPlayerState || (ZegoMediaPlayerState = {}));
/**
 * Player network event.
 */
export var ZegoMediaPlayerNetworkEvent;
(function (ZegoMediaPlayerNetworkEvent) {
    /**
     * Network resources are not playing well, and start trying to cache data
     */
    ZegoMediaPlayerNetworkEvent[ZegoMediaPlayerNetworkEvent["BufferBegin"] = 0] = "BufferBegin";
    /**
     * Network resources can be played smoothly
     */
    ZegoMediaPlayerNetworkEvent[ZegoMediaPlayerNetworkEvent["BufferEnded"] = 1] = "BufferEnded";
})(ZegoMediaPlayerNetworkEvent || (ZegoMediaPlayerNetworkEvent = {}));
/**
 * Audio channel.
 */
export var ZegoMediaPlayerAudioChannel;
(function (ZegoMediaPlayerAudioChannel) {
    /**
     * Audio channel left
     */
    ZegoMediaPlayerAudioChannel[ZegoMediaPlayerAudioChannel["Left"] = 0] = "Left";
    /**
     * Audio channel right
     */
    ZegoMediaPlayerAudioChannel[ZegoMediaPlayerAudioChannel["Right"] = 1] = "Right";
    /**
     * Audio channel all
     */
    ZegoMediaPlayerAudioChannel[ZegoMediaPlayerAudioChannel["All"] = 2] = "All";
})(ZegoMediaPlayerAudioChannel || (ZegoMediaPlayerAudioChannel = {}));
/// AudioEffectPlayer state.
export var ZegoAudioEffectPlayState;
(function (ZegoAudioEffectPlayState) {
    /// Not playing
    ZegoAudioEffectPlayState[ZegoAudioEffectPlayState["NoPlay"] = 0] = "NoPlay";
    /// Playing
    ZegoAudioEffectPlayState[ZegoAudioEffectPlayState["Playing"] = 1] = "Playing";
    /// Pausing
    ZegoAudioEffectPlayState[ZegoAudioEffectPlayState["Pausing"] = 2] = "Pausing";
    /// End of play
    ZegoAudioEffectPlayState[ZegoAudioEffectPlayState["PlayEnded"] = 3] = "PlayEnded";
})(ZegoAudioEffectPlayState || (ZegoAudioEffectPlayState = {}));
/// volume type.
export var ZegoVolumeType;
(function (ZegoVolumeType) {
    /// volume local
    ZegoVolumeType[ZegoVolumeType["Local"] = 0] = "Local";
    /// volume remote
    ZegoVolumeType[ZegoVolumeType["Remote"] = 1] = "Remote";
})(ZegoVolumeType || (ZegoVolumeType = {}));
/// audio sample rate.
export var ZegoAudioSampleRate;
(function (ZegoAudioSampleRate) {
    /// Unknown
    ZegoAudioSampleRate[ZegoAudioSampleRate["Unknown"] = 0] = "Unknown";
    /// 8K
    ZegoAudioSampleRate[ZegoAudioSampleRate["Rate8K"] = 8000] = "Rate8K";
    /// 16K
    ZegoAudioSampleRate[ZegoAudioSampleRate["Rate16K"] = 16000] = "Rate16K";
    /// 22.05K
    ZegoAudioSampleRate[ZegoAudioSampleRate["Rate22K"] = 22050] = "Rate22K";
    /// 24K
    ZegoAudioSampleRate[ZegoAudioSampleRate["Rate24K"] = 24000] = "Rate24K";
    /// 32K
    ZegoAudioSampleRate[ZegoAudioSampleRate["Rate32K"] = 32000] = "Rate32K";
    /// 44.1K
    ZegoAudioSampleRate[ZegoAudioSampleRate["Rate44K"] = 44100] = "Rate44K";
    /// 48K
    ZegoAudioSampleRate[ZegoAudioSampleRate["Rate48K"] = 48000] = "Rate48K";
})(ZegoAudioSampleRate || (ZegoAudioSampleRate = {}));
/// Audio capture source type.
export var ZegoAudioSourceType;
(function (ZegoAudioSourceType) {
    /// Default audio capture source (the main channel uses custom audio capture by default the aux channel uses the same sound as main channel by default)
    ZegoAudioSourceType[ZegoAudioSourceType["Default"] = 0] = "Default";
    /// Use custom audio capture, refer to [enableCustomAudioIO]
    ZegoAudioSourceType[ZegoAudioSourceType["Custom"] = 1] = "Custom";
    /// Use media player as audio source, only support aux channel
    ZegoAudioSourceType[ZegoAudioSourceType["MediaPlayer"] = 2] = "MediaPlayer";
})(ZegoAudioSourceType || (ZegoAudioSourceType = {}));
/// Record type.
export var ZegoDataRecordType;
(function (ZegoDataRecordType) {
    /// This field indicates that the Express-Audio SDK records audio by default, and the Express-Video SDK records audio and video by default. When recording files in .aac format, audio is also recorded by default.
    ZegoDataRecordType[ZegoDataRecordType["Default"] = 0] = "Default";
    /// only record audio
    ZegoDataRecordType[ZegoDataRecordType["OnlyAudio"] = 1] = "OnlyAudio";
    /// only record video, Audio SDK and recording .aac format files are invalid.
    ZegoDataRecordType[ZegoDataRecordType["OnlyVideo"] = 2] = "OnlyVideo";
    /// record audio and video. Express-Audio SDK and .aac format files are recorded only audio.
    ZegoDataRecordType[ZegoDataRecordType["AudioAndVideo"] = 3] = "AudioAndVideo";
})(ZegoDataRecordType || (ZegoDataRecordType = {}));
/// Record state.
export var ZegoDataRecordState;
(function (ZegoDataRecordState) {
    /// Unrecorded state, which is the state when a recording error occurs or before recording starts.
    ZegoDataRecordState[ZegoDataRecordState["NoRecord"] = 0] = "NoRecord";
    /// Recording in progress, in this state after successfully call [startRecordingCapturedData] function
    ZegoDataRecordState[ZegoDataRecordState["Recording"] = 1] = "Recording";
    /// Record successs
    ZegoDataRecordState[ZegoDataRecordState["Success"] = 2] = "Success";
})(ZegoDataRecordState || (ZegoDataRecordState = {}));
/// Audio data callback function enable bitmask enumeration.
export var ZegoAudioDataCallbackBitMask;
(function (ZegoAudioDataCallbackBitMask) {
    /// The mask bit of this field corresponds to the enable [onCapturedAudioData] callback function
    ZegoAudioDataCallbackBitMask[ZegoAudioDataCallbackBitMask["Captured"] = 1] = "Captured";
    /// The mask bit of this field corresponds to the enable [onPlaybackAudioData] callback function
    ZegoAudioDataCallbackBitMask[ZegoAudioDataCallbackBitMask["Playback"] = 2] = "Playback";
    /// The mask bit of this field corresponds to the enable [onMixedAudioData] callback function
    ZegoAudioDataCallbackBitMask[ZegoAudioDataCallbackBitMask["Mixed"] = 4] = "Mixed";
    /// The mask bit of this field corresponds to the enable [onPlayerAudioData] callback function
    ZegoAudioDataCallbackBitMask[ZegoAudioDataCallbackBitMask["Player"] = 8] = "Player";
})(ZegoAudioDataCallbackBitMask || (ZegoAudioDataCallbackBitMask = {}));
/// Network mode
export var ZegoNetworkMode;
(function (ZegoNetworkMode) {
    /// Offline (No network)
    ZegoNetworkMode[ZegoNetworkMode["Offline"] = 0] = "Offline";
    /// Unknown network mode
    ZegoNetworkMode[ZegoNetworkMode["Unknown"] = 1] = "Unknown";
    /// Wired Ethernet (LAN)
    ZegoNetworkMode[ZegoNetworkMode["Ethernet"] = 2] = "Ethernet";
    /// Wi-Fi (WLAN)
    ZegoNetworkMode[ZegoNetworkMode["WiFi"] = 3] = "WiFi";
    /// 2G Network (GPRS/EDGE/CDMA1x/etc.)
    ZegoNetworkMode[ZegoNetworkMode["Mode2G"] = 4] = "Mode2G";
    /// 3G Network (WCDMA/HSDPA/EVDO/etc.)
    ZegoNetworkMode[ZegoNetworkMode["Mode3G"] = 5] = "Mode3G";
    /// 4G Network (LTE)
    ZegoNetworkMode[ZegoNetworkMode["Mode4G"] = 6] = "Mode4G";
    /// 5G Network (NR (NSA/SA))
    ZegoNetworkMode[ZegoNetworkMode["Mode5G"] = 7] = "Mode5G";
})(ZegoNetworkMode || (ZegoNetworkMode = {}));
/// network speed test type
export var ZegoNetworkSpeedTestType;
(function (ZegoNetworkSpeedTestType) {
    /// uplink
    ZegoNetworkSpeedTestType[ZegoNetworkSpeedTestType["Uplink"] = 0] = "Uplink";
    /// downlink
    ZegoNetworkSpeedTestType[ZegoNetworkSpeedTestType["Downlink"] = 1] = "Downlink";
})(ZegoNetworkSpeedTestType || (ZegoNetworkSpeedTestType = {}));
/** The exception type for the device. */
export var ZegoDeviceExceptionType;
(function (ZegoDeviceExceptionType) {
    /** Unknown device exception. */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["Unknown"] = 0] = "Unknown";
    /** Generic device exception. */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["Generic"] = 1] = "Generic";
    /** Invalid device ID exception. */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["InvalidID"] = 2] = "InvalidID";
    /** Device permission is not granted. */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["PermissionNotGranted"] = 3] = "PermissionNotGranted";
    /** The capture frame rate of the device is 0. */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["ZeroCaptureFPS"] = 4] = "ZeroCaptureFPS";
    /** The device is being occupied. */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["DeviceOccupied"] = 5] = "DeviceOccupied";
    /** The device is unplugged (not plugged in). */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["DeviceUnplugged"] = 6] = "DeviceUnplugged";
    /** The device requires the system to restart before it can work (Windows platform only). */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["RebootRequired"] = 7] = "RebootRequired";
    /** The system media service is unavailable, e.g. when the iOS system detects that the current pressure is huge (such as playing a lot of animation), it is possible to disable all media related services (Apple platform only). */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["MediaServiceWereLost"] = 8] = "MediaServiceWereLost";
    /** The device is being occupied by Siri (Apple platform only). */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["SiriIsRecording"] = 9] = "SiriIsRecording";
    /** The device captured sound level is too low (Windows platform only). */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["SoundLevelTooLow"] = 10] = "SoundLevelTooLow";
    /** The device is being occupied, and maybe cause by iPad magnetic case (Apple platform only). */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["MagneticCase"] = 11] = "MagneticCase";
})(ZegoDeviceExceptionType || (ZegoDeviceExceptionType = {}));
/** Device type. */
export var ZegoDeviceType;
(function (ZegoDeviceType) {
    /** Unknown device type. */
    ZegoDeviceType[ZegoDeviceType["Unknown"] = 0] = "Unknown";
    /** Camera device. */
    ZegoDeviceType[ZegoDeviceType["Camera"] = 1] = "Camera";
    /** Microphone device. */
    ZegoDeviceType[ZegoDeviceType["Microphone"] = 2] = "Microphone";
    /** Speaker device. */
    ZegoDeviceType[ZegoDeviceType["Speaker"] = 3] = "Speaker";
    /** Audio device. (Other audio device that cannot be accurately classified into microphones or speakers.) */
    ZegoDeviceType[ZegoDeviceType["AudioDevice"] = 4] = "AudioDevice";
})(ZegoDeviceType || (ZegoDeviceType = {}));
/** Remote device status. */
export var ZegoRemoteDeviceState;
(function (ZegoRemoteDeviceState) {
    /** Device on */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["Open"] = 0] = "Open";
    /** General device error */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["GenericError"] = 1] = "GenericError";
    /** Invalid device ID */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["InvalidID"] = 2] = "InvalidID";
    /** No permission */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["NoAuthorization"] = 3] = "NoAuthorization";
    /** Captured frame rate is 0 */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["ZeroFPS"] = 4] = "ZeroFPS";
    /** The device is occupied */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["InUseByOther"] = 5] = "InUseByOther";
    /** The device is not plugged in or unplugged */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["Unplugged"] = 6] = "Unplugged";
    /** The system needs to be restarted */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["RebootRequired"] = 7] = "RebootRequired";
    /** System media services stop, such as under the iOS platform, when the system detects that the current pressure is huge (such as playing a lot of animation), it is possible to disable all media related services. */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["SystemMediaServicesLost"] = 8] = "SystemMediaServicesLost";
    /** Capturing disabled */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["Disable"] = 9] = "Disable";
    /** The remote device is muted */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["Mute"] = 10] = "Mute";
    /** The device is interrupted, such as a phone call interruption, etc. */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["Interruption"] = 11] = "Interruption";
    /** There are multiple apps at the same time in the foreground, such as the iPad app split screen, the system will prohibit all apps from using the camera. */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["InBackground"] = 12] = "InBackground";
    /** CDN server actively disconnected */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["MultiForegroundApp"] = 13] = "MultiForegroundApp";
    /** The system is under high load pressure and may cause abnormal equipment. */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["BySystemPressure"] = 14] = "BySystemPressure";
    /** The remote device is not supported to publish the device state. */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["NotSupport"] = 15] = "NotSupport";
})(ZegoRemoteDeviceState || (ZegoRemoteDeviceState = {}));
