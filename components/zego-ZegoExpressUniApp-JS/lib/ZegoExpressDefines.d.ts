import { ZegoMediaPlayerListener } from "./ZegoExpressEventHandler";
export interface ZegoDestroyCompletionCallback {
}
export interface ZegoRoomSetRoomExtraInfoResult {
    errorCode: number;
}
export interface ZegoPublisherSetStreamExtraInfoResult {
    errorCode: number;
}
export interface ZegoPublisherUpdateCdnUrlResult {
    errorCode: number;
}
export interface ZegoPublisherTakeSnapshotResult {
    errorCode: number;
    imageBase64: string;
}
export interface ZegoPlayerTakeSnapshotResult {
    errorCode: number;
    imageBase64: string;
}
export interface ZegoIMSendBroadcastMessageResult {
    errorCode: number;
    messageID: number;
}
export interface ZegoIMSendBarrageMessageResult {
    errorCode: number;
    messageID: string;
}
export interface ZegoIMSendCustomCommandResult {
    errorCode: number;
}
export interface ZegoMediaPlayerLoadResourceResult {
    errorCode: number;
}
export interface ZegoMediaPlayerSeekToResult {
    errorCode: number;
}
export interface ZegoMediaPlayerTakeSnapshotResult {
    errorCode: number;
    imageBase64: string;
}
export interface ZegoMixerStartResult {
    errorCode: number;
    extendedData: Map<string, object>;
}
export interface ZegoMixerStopResult {
    errorCode: number;
}
export interface ZegoSize {
    width: number;
    height: number;
}
export interface ZegoRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
/**
 * Application scenario.
 */
export declare enum ZegoScenario {
    /**
     * General scenario
     */
    General = 0,
    /**
     * Communication scenario
     */
    Communication = 1,
    /**
     * Live scenario
     */
    Live = 2
}
/**
 * Language.
 */
export declare enum ZegoLanguage {
    /**
     * English
     */
    English = 0,
    /**
     * Chinese
     */
    Chinese = 1
}
export declare enum ZegoOrientation {
    PortraitUp = 0,
    LandscapeLeft = 1,
    PortraitDown = 2,
    LandscapeRight = 3
}
/**
 * Engine state.
 */
export declare enum ZegoEngineState {
    /**
     * The engine has started
     */
    Start = 0,
    /**
     * The engine has stoped
     */
    Stop = 1
}
/**
 * Room state.
 */
export declare enum ZegoRoomState {
    /**
     * Unconnected state, enter this state before logging in and after exiting the room. If there is a steady state abnormality in the process of logging in to the room, such as AppID and AppSign are incorrect, or if the same user name is logged in elsewhere and the local end is KickOut, it will enter this state.
     */
    DisConnected = 0,
    /**
     * The state that the connection is being requested. It will enter this state after successful execution login room function. The display of the UI is usually performed using this state. If the connection is interrupted due to poor network quality, the SDK will perform an internal retry and will return to the requesting connection status.
     */
    Connecting = 1,
    /**
     * The status that is successfully connected. Entering this status indicates that the login to the room has been successful. The user can receive the callback notification of the user and the stream information in the room.
     */
    Connected = 2
}
/** Room mode. */
export declare enum ZegoRoomMode {
    /** Single room mode. */
    SingleRoom = 0,
    /** Multiple room mode. */
    MultiRoom = 1
}
/**
 * Publish channel.
 */
export declare enum ZegoPublishChannel {
    /**
     * Main publish channel
     */
    Main = 0,
    /**
     * Auxiliary publish channel
     */
    Aux = 1
}
/**
 * Publish stream status.
 */
export declare enum ZegoPublisherState {
    /**
     * The state is not published, and it is in this state before publishing the stream. If a steady-state exception occurs in the publish process, such as AppID and AppSign are incorrect, or if other users are already publishing the stream, there will be a failure and enter this state.
     */
    NoPublish = 0,
    /**
     * The state that it is requesting to publish the stream after the [startPublishingStream] function is successfully called. The UI is usually displayed through this state. If the connection is interrupted due to poor network quality, the SDK will perform an internal retry and will return to the requesting state.
     */
    PublishRequesting = 1,
    /**
     * The state that the stream is being published, entering the state indicates that the stream has been successfully published, and the user can communicate normally.
     */
    Publishing = 2
}
/**
 * Video rendering fill mode.
 */
export declare enum ZegoViewMode {
    /**
     * The proportional scaling up, there may be black borders
     */
    AspectFit = 0,
    /**
     * The proportional zoom fills the entire View and may be partially cut
     */
    AspectFill = 1,
    /**
     * Fill the entire view, the image may be stretched
     */
    ScaleToFill = 2
}
/**
 * Mirror mode for previewing or playing the of the stream.
 */
export declare enum ZegoVideoMirrorMode {
    /**
     * The mirror image only for previewing locally. This mode is used by default.
     */
    OnlyPreviewMirror = 0,
    /**
     * Both the video previewed locally and the far end playing the stream will see mirror image.
     */
    BothMirror = 1,
    /**
     * Both the video previewed locally and the far end playing the stream will not see mirror image.
     */
    NoMirror = 2,
    /**
     * The mirror image only for far end playing the stream.
     */
    OnlyPublishMirror = 3
}
export declare enum ZegoSEIType {
    ZegoDefined = 0,
    UserUnregister = 1
}
export declare enum ZegoVoiceChangerPreset {
    None = 0,
    MenToChild = 1,
    MenToWomen = 2,
    WomenToChild = 3,
    WomenToMen = 4,
    Foreigner = 5,
    OptimusPrime = 6,
    Android = 7,
    Ethereal = 8,
    MaleMagnetic = 9,
    FemaleFresh = 10
}
export declare enum ZegoReverbPreset {
    None = 0,
    SoftRoom = 1,
    LargeRoom = 2,
    ConcerHall = 3,
    Valley = 4,
    RecordingStudio = 5,
    Basement = 6,
    KTV = 7,
    Popular = 8,
    Rock = 9,
    VocalConcert = 10
}
/**
 * Video configuration resolution and bitrate preset enumeration. The preset resolutions are adapted for mobile and desktop. On mobile, height is longer than width, and desktop is the opposite. For example, 1080p is actually 1080(w) x 1920(h) on mobile and 1920(w) x 1080(h) on desktop.
 */
export declare enum ZegoVideoConfigPreset {
    /**
     * Set the resolution to 320x180, the default is 15 fps, the code rate is 300 kbps
     */
    Preset180P = 0,
    /**
     * Set the resolution to 480x270, the default is 15 fps, the code rate is 400 kbps
     */
    Preset270P = 1,
    /**
     * Set the resolution to 640x360, the default is 15 fps, the code rate is 600 kbps
     */
    Preset360P = 2,
    /**
     * Set the resolution to 960x540, the default is 15 fps, the code rate is 1200 kbps
     */
    Preset540P = 3,
    /**
     * Set the resolution to 1280x720, the default is 15 fps, the code rate is 1500 kbps
     */
    Preset720P = 4,
    /**
     * Set the resolution to 1920x1080, the default is 15 fps, the code rate is 3000 kbps
     */
    Preset1080P = 5
}
/**
 * Stream quality level.
 */
export declare enum ZegoStreamQualityLevel {
    /**
     * Excellent
     */
    Excellent = 0,
    /**
     * Good
     */
    Good = 1,
    /**
     * Normal
     */
    Medium = 2,
    /**
     * Bad
     */
    Bad = 3,
    /**
     * Failed
     */
    Die = 4
}
export declare enum ZegoAudioChannel {
    Unknown = 0,
    Mono = 1,
    Stereo = 2
}
export declare enum ZegoAudioCaptureStereoMode {
    None = 0,
    Always = 1,
    Adaptive = 2
}
export declare enum ZegoAudioMixMode {
    Raw = 0,
    Focused = 1
}
export declare enum ZegoAudioCodecID {
    Default = 0,
    Normal = 1,
    Normal2 = 2,
    Normal3 = 3,
    Low = 4,
    Low2 = 5,
    Low3 = 6
}
/**
 * Video codec ID.
 */
export declare enum ZegoVideoCodecID {
    /**
     * Default (H.264)
     */
    Default = 0,
    /**
     * Scalable Video Coding (H.264 SVC)
     */
    SVC = 1,
    /**
     * VP8
     */
    VP8 = 2,
    /**
     * H.265
     */
    H265 = 3
}
/**
 * Player video layer.
 */
export declare enum ZegoPlayerVideoLayer {
    /**
     * The layer to be played depends on the network status
     */
    Auto = 0,
    /**
     * Play the base layer (small resolution)
     */
    Base = 1,
    /**
     * Play the extend layer (big resolution)
     */
    BaseExtend = 2
}
/**
 * Video stream type
 */
export declare enum ZegoVideoStreamType {
    /**
     * The type to be played depends on the network status
     */
    Default = 0,
    /**
     * small resolution type
     */
    Small = 1,
    /**
     * big resolution type
     */
    Big = 2
}
export declare enum ZegoAECMode {
    Aggressive = 0,
    Medium = 1,
    Soft = 2
}
export declare enum ZegoANSMode {
    Soft = 0,
    Medium = 1,
    Aggressive = 2
}
/**
 * Traffic control property (bitmask enumeration).
 */
export declare enum ZegoTrafficControlProperty {
    /**
     * Basic
     */
    Basic = 0,
    /**
     * Adaptive FPS
     */
    AdaptiveFPS = 1,
    /**
     * Adaptive resolution
     */
    AdaptiveResolution = 2,
    /**
     * Adaptive Audio bitrate
     */
    AdaptiveAudioBitrate = 4
}
/**
 * Video transmission mode when current bitrate is lower than the set minimum bitrate.
 */
export declare enum ZegoTrafficControlMinVideoBitrateMode {
    /**
     * Stop video transmission when current bitrate is lower than the set minimum bitrate
     */
    NoVideo = 0,
    /**
     * Video is sent at a very low frequency (no more than 2fps) which is lower than the set minimum bitrate
     */
    UltraLowFPS = 1
}
/**
 * Factors that trigger traffic control
 */
export declare enum ZegoTrafficControlFocusOnMode {
    /**
     * Focus only on the local network
     */
    LocalOnly = 0,
    /**
     * Pay attention to the local network, but also take into account the remote network, currently only effective in the 1v1 scenario
     */
    Remote = 1
}
/**
 * Playing stream status.
 */
export declare enum ZegoPlayerState {
    /**
     * The state of the flow is not played, and it is in this state before the stream is played. If the steady flow anomaly occurs during the playing process, such as AppID and AppSign are incorrect, it will enter this state.
     */
    NoPlay = 0,
    /**
     * The state that the stream is being requested for playing. After the [startPlayingStream] function is successfully called, it will enter the state. The UI is usually displayed through this state. If the connection is interrupted due to poor network quality, the SDK will perform an internal retry and will return to the requesting state.
     */
    PlayRequesting = 1,
    /**
     * The state that the stream is being playing, entering the state indicates that the stream has been successfully played, and the user can communicate normally.
     */
    Playing = 2
}
/**
 * Media event when playing.
 */
export declare enum ZegoPlayerMediaEvent {
    /**
     * Audio stuck event when playing
     */
    AudioBreakOccur = 0,
    /**
     * Audio stuck event recovery when playing
     */
    AudioBreakResume = 1,
    /**
     * Video stuck event when playing
     */
    VideoBreakOccur = 2,
    /**
     * Video stuck event recovery when playing
     */
    VideoBreakResume = 3
}
/**
 * Stream Resource Mode
 */
export declare enum ZegoStreamResourceMode {
    /**
     * Default mode. The SDK will automatically select the streaming resource according to the cdnConfig parameters set by the player config and the ready-made background configuration.
     */
    Default = 0,
    /**
     * Playing stream only from CDN.
     */
    OnlyCDN = 1,
    /**
     * Playing stream only from L3.
     */
    OnlyL3 = 2,
    /**
     * Playing stream only from RTC.
     */
    OnlyRTC = 3
}
/**
 * Update type.
 */
export declare enum ZegoUpdateType {
    /**
     * Add
     */
    Add = 0,
    /**
     * Delete
     */
    Delete = 1
}
export declare enum ZegoStreamRelayCDNState {
    NoRelay = 0,
    RelayRequesting = 1,
    Relaying = 2
}
export declare enum ZegoStreamRelayCDNUpdateReason {
    None = 0,
    ServerError = 1,
    HandshakeFailed = 2,
    AccessPointError = 3,
    CreateStreamFailed = 4,
    BadName = 5,
    CDNServerDisconnected = 6,
    Disconnected = 7,
    MixStreamAllInputStreamClosed = 8,
    MixStreamAllInputStreamNoData = 9,
    MixStreamServerInternalError = 10
}
export declare enum ZegoAudioDeviceType {
    Input = 0,
    Output = 1
}
/**  Audio route */
export declare enum ZegoAudioRoute {
    /** Speaker */
    Speaker = 0,
    /** Headphone */
    Headphone = 1,
    /** Bluetooth device */
    Bluetooth = 2,
    /** Receiver */
    Receiver = 3,
    /** External USB audio device */
    ExternalUSB = 4,
    /** Apple AirPlay */
    AirPlay = 5
}
export declare enum ZegoMixerInputContentType {
    Audio = 0,
    Video = 1
}
export declare enum ZegoCapturePipelineScaleMode {
    Pre = 0,
    Post = 1
}
export declare enum ZegoVideoFrameFormat {
    Unknown = 0,
    I420 = 1,
    NV12 = 2,
    NV21 = 3,
    BGRA32 = 4,
    RGBA32 = 5,
    ARGB32 = 6,
    ABGR32 = 7,
    I422 = 8
}
export declare enum ZegoVideoEncodedFrameFormat {
    AVCC = 0,
    AnnexB = 1
}
export declare enum ZegoVideoBufferType {
    Unknown = 0,
    RawData = 1,
    EncodedData = 2,
    GLTexture2D = 3,
    CVPixelBuffer = 4
}
export declare enum ZegoVideoFrameFormatSeries {
    RGB = 0,
    YUV = 1
}
export declare enum ZegoVideoFlipMode {
    None = 0,
    X = 1,
    Y = 2,
    XY = 3
}
export declare enum ZegoCustomAudioProcessType {
    Remote = 0,
    Capture = 1,
    CaptureAndRemote = 2
}
/** Audio Config Preset. */
export declare enum ZegoAudioConfigPreset {
    /** Basic sound quality (16 kbps, Mono, ZegoAudioCodecIDDefault) */
    BasicQuality = 0,
    /** Standard sound quality (48 kbps, Mono, ZegoAudioCodecIDDefault) */
    StandardQuality = 1,
    /** Standard sound quality (56 kbps, Stereo, ZegoAudioCodecIDDefault) */
    StandardQualityStereo = 2,
    /** High sound quality (128 kbps, Mono, ZegoAudioCodecIDDefault) */
    HighQuality = 3,
    /** High sound quality (192 kbps, Stereo, ZegoAudioCodecIDDefault) */
    HighQualityStereo = 4
}
/**
 * Player state.
 */
export declare enum ZegoMediaPlayerState {
    /**
     * Not playing
     */
    NoPlay = 0,
    /**
     * Playing
     */
    Playing = 1,
    /**
     * Pausing
     */
    Pausing = 2,
    /**
     * End of play
     */
    PlayEnded = 3
}
/**
 * Player network event.
 */
export declare enum ZegoMediaPlayerNetworkEvent {
    /**
     * Network resources are not playing well, and start trying to cache data
     */
    BufferBegin = 0,
    /**
     * Network resources can be played smoothly
     */
    BufferEnded = 1
}
/**
 * Audio channel.
 */
export declare enum ZegoMediaPlayerAudioChannel {
    /**
     * Audio channel left
     */
    Left = 0,
    /**
     * Audio channel right
     */
    Right = 1,
    /**
     * Audio channel all
     */
    All = 2
}
export declare enum ZegoAudioEffectPlayState {
    NoPlay = 0,
    Playing = 1,
    Pausing = 2,
    PlayEnded = 3
}
export declare enum ZegoVolumeType {
    Local = 0,
    Remote = 1
}
export declare enum ZegoAudioSampleRate {
    Unknown = 0,
    Rate8K = 8000,
    Rate16K = 16000,
    Rate22K = 22050,
    Rate24K = 24000,
    Rate32K = 32000,
    Rate44K = 44100,
    Rate48K = 48000
}
export declare enum ZegoAudioSourceType {
    Default = 0,
    Custom = 1,
    MediaPlayer = 2
}
export declare enum ZegoDataRecordType {
    Default = 0,
    OnlyAudio = 1,
    OnlyVideo = 2,
    AudioAndVideo = 3
}
export declare enum ZegoDataRecordState {
    NoRecord = 0,
    Recording = 1,
    Success = 2
}
export declare enum ZegoAudioDataCallbackBitMask {
    Captured = 1,
    Playback = 2,
    Mixed = 4,
    Player = 8
}
export declare enum ZegoNetworkMode {
    Offline = 0,
    Unknown = 1,
    Ethernet = 2,
    WiFi = 3,
    Mode2G = 4,
    Mode3G = 5,
    Mode4G = 6,
    Mode5G = 7
}
export declare enum ZegoNetworkSpeedTestType {
    Uplink = 0,
    Downlink = 1
}
/** The exception type for the device. */
export declare enum ZegoDeviceExceptionType {
    /** Unknown device exception. */
    Unknown = 0,
    /** Generic device exception. */
    Generic = 1,
    /** Invalid device ID exception. */
    InvalidID = 2,
    /** Device permission is not granted. */
    PermissionNotGranted = 3,
    /** The capture frame rate of the device is 0. */
    ZeroCaptureFPS = 4,
    /** The device is being occupied. */
    DeviceOccupied = 5,
    /** The device is unplugged (not plugged in). */
    DeviceUnplugged = 6,
    /** The device requires the system to restart before it can work (Windows platform only). */
    RebootRequired = 7,
    /** The system media service is unavailable, e.g. when the iOS system detects that the current pressure is huge (such as playing a lot of animation), it is possible to disable all media related services (Apple platform only). */
    MediaServiceWereLost = 8,
    /** The device is being occupied by Siri (Apple platform only). */
    SiriIsRecording = 9,
    /** The device captured sound level is too low (Windows platform only). */
    SoundLevelTooLow = 10,
    /** The device is being occupied, and maybe cause by iPad magnetic case (Apple platform only). */
    MagneticCase = 11
}
/** Device type. */
export declare enum ZegoDeviceType {
    /** Unknown device type. */
    Unknown = 0,
    /** Camera device. */
    Camera = 1,
    /** Microphone device. */
    Microphone = 2,
    /** Speaker device. */
    Speaker = 3,
    /** Audio device. (Other audio device that cannot be accurately classified into microphones or speakers.) */
    AudioDevice = 4
}
/** Remote device status. */
export declare enum ZegoRemoteDeviceState {
    /** Device on */
    Open = 0,
    /** General device error */
    GenericError = 1,
    /** Invalid device ID */
    InvalidID = 2,
    /** No permission */
    NoAuthorization = 3,
    /** Captured frame rate is 0 */
    ZeroFPS = 4,
    /** The device is occupied */
    InUseByOther = 5,
    /** The device is not plugged in or unplugged */
    Unplugged = 6,
    /** The system needs to be restarted */
    RebootRequired = 7,
    /** System media services stop, such as under the iOS platform, when the system detects that the current pressure is huge (such as playing a lot of animation), it is possible to disable all media related services. */
    SystemMediaServicesLost = 8,
    /** Capturing disabled */
    Disable = 9,
    /** The remote device is muted */
    Mute = 10,
    /** The device is interrupted, such as a phone call interruption, etc. */
    Interruption = 11,
    /** There are multiple apps at the same time in the foreground, such as the iPad app split screen, the system will prohibit all apps from using the camera. */
    InBackground = 12,
    /** CDN server actively disconnected */
    MultiForegroundApp = 13,
    /** The system is under high load pressure and may cause abnormal equipment. */
    BySystemPressure = 14,
    /** The remote device is not supported to publish the device state. */
    NotSupport = 15
}
export interface ZegoLogConfig {
    logPath?: string;
    logSize?: number;
}
export interface ZegoCustomVideoCaptureConfig {
    bufferType: ZegoVideoBufferType;
}
export interface ZegoCustomVideoProcessConfig {
    bufferType: ZegoVideoBufferType;
}
export interface ZegoCustomVideoRenderConfig {
    bufferType: ZegoVideoBufferType;
    frameFormatSeries: ZegoVideoFrameFormatSeries;
    enableEngineRender: boolean;
}
export interface ZegoCustomAudioConfig {
    sourceType: ZegoAudioSourceType;
}
/** Profile for create engine */
export interface ZegoEngineProfile {
    /** Application ID issued by ZEGO for developers, please apply from the ZEGO Admin Console https://console-express.zego.im The value ranges from 0 to 4294967295. */
    appID: number;
    /** Application signature for each AppID, please apply from the ZEGO Admin Console. Application signature is a 64 character string. Each character has a range of '0' ~ '9', 'a' ~ 'z'. AppSign native 2.17.0 and later allows nil or no transmission. If the token is passed empty or not passed, the token must be entered in the [ZegoRoomConfig] parameter for authentication when the [loginRoom] interface is called to login to the room. Token generated way please refer to the [use token authentication] (https://doc-zh.zego.im/article/10360). */
    appSign: string;
    /** The application scenario. Developers can choose one of ZegoScenario based on the scenario of the app they are developing, and the engine will preset a more general setting for specific scenarios based on the set scenario. After setting specific scenarios, developers can still call specific functions to set specific parameters if they have customized parameter settings. */
    scenario: ZegoScenario;
}
export interface ZegoEngineConfig {
    advancedConfig?: {
        [key: string]: string;
    };
}
/**
 * Advanced room configuration.
 *
 * Configure maximum number of users in the room and authentication token, etc.
 */
export interface ZegoRoomConfig {
    /**
     * The maximum number of users in the room, Passing 0 means unlimited, the default is unlimited.
     */
    maxMemberCount: number;
    /**
     * Whether to enable the user in and out of the room callback notification [onRoomUserUpdate], the default is off. If developers need to use ZEGO Room user notifications, make sure that each user who login sets this flag to true
     */
    isUserStatusNotify: boolean;
    /**
     * The token issued by the developer's business server is used to ensure security. The generation rules are detailed in Room Login Authentication Description [use token authentication] (https://doc-en.zego.im/article/3881) Default is empty string, that is, no authentication. Native version 2.17.0 or later If appSign is not passed when the [createEngine] interface is called to create an engine or appSign is empty, this parameter must be set for authentication when you log in to a room.
     */
    token: string;
}
export interface ZegoVideoConfig {
    captureWidth: number;
    captureHeight: number;
    encodeWidth: number;
    encodeHeight: number;
    bitrate: number;
    fps: number;
    codecID: ZegoVideoCodecID;
}
export interface ZegoTrafficControlInfo {
    fps: number;
    bitrate: number;
    resolution: ZegoSize;
}
export interface ZegoSEIConfig {
    type: ZegoSEIType;
}
export interface ZegoVoiceChangerParam {
    pitch: number;
}
export interface ZegoReverbParam {
    roomSize: number;
    reverberance: number;
    damping: number;
    dryWetRatio: number;
}
export interface ZegoReverbAdvancedParam {
    roomSize: number;
    reverberance: number;
    damping: number;
    wetOnly: boolean;
    wetGain: number;
    dryGain: number;
    toneLow: number;
    toneHigh: number;
    preDelay: number;
    stereoWidth: number;
}
export interface ZegoReverbEchoParam {
    inGain: number;
    outGain: number;
    numDelays: number;
    delay: number[];
    decay: number[];
}
export interface ZegoUser {
    userID: string;
    userName: string;
}
export interface ZegoStream {
    user: ZegoUser;
    streamID: string;
    extraInfo: string;
}
export interface ZegoRoomExtraInfo {
    key: string;
    value: string;
    updateUser: ZegoUser;
    updateTime: number;
}
/**
 * Advanced publisher configuration.
 *
 * Configure room id
 */
export interface ZegoPublisherConfig {
    /** The Room ID, It is not necessary to pass in single room mode, but the ID of the corresponding room must be passed in multi-room mode */
    roomID: string;
    /** Whether to synchronize the network time when pushing streams. 1 is synchronized with 0 is not synchronized. And must be used with setStreamAlignmentProperty. It is used to align multiple streams at the mixed stream service or streaming end, such as the chorus scene of KTV. */
    forceSynchronousNetworkTime: number;
}
export interface ZegoPublishStreamQuality {
    videoCaptureFPS: number;
    videoEncodeFPS: number;
    videoSendFPS: number;
    videoKBPS: number;
    audioCaptureFPS: number;
    audioSendFPS: number;
    audioKBPS: number;
    rtt: number;
    packetLostRate: number;
    level: ZegoStreamQualityLevel;
    isHardwareEncode: boolean;
    videoCodecID: ZegoVideoCodecID;
    totalSendBytes: number;
    audioSendBytes: number;
    videoSendBytes: number;
}
/**
 * CDN config object.
 *
 * Includes CDN URL and authentication parameter string
 */
export interface ZegoCDNConfig {
    /**
     * CDN URL
     */
    url: string;
    /**
     * Auth param of URL
     */
    authParam: string;
}
export interface ZegoStreamRelayCDNInfo {
    url: string;
    state: ZegoStreamRelayCDNState;
    updateReason: ZegoStreamRelayCDNUpdateReason;
    stateTime: number;
}
/**
 * Advanced player configuration.
 *
 * Configure playing stream CDN configuration, video layer
 */
export interface ZegoPlayerConfig {
    /**
     * Stream resource mode
     */
    resourceMode: ZegoStreamResourceMode;
    /**
     * The CDN configuration for playing stream. If set, the stream is play according to the URL instead of the streamID. After that, the streamID is only used as the ID of SDK internal callback.
     */
    cdnConfig: ZegoCDNConfig;
}
export interface ZegoPlayStreamQuality {
    videoRecvFPS: number;
    videoDejitterFPS: number;
    videoDecodeFPS: number;
    videoRenderFPS: number;
    videoKBPS: number;
    videoBreakRate: number;
    audioRecvFPS: number;
    audioDejitterFPS: number;
    audioDecodeFPS: number;
    audioRenderFPS: number;
    audioKBPS: number;
    audioBreakRate: number;
    rtt: number;
    packetLostRate: number;
    peerToPeerDelay: number;
    peerToPeerPacketLostRate: number;
    level: ZegoStreamQualityLevel;
    delay: number;
    avTimestampDiff: number;
    isHardwareDecode: boolean;
    videoCodecID: ZegoVideoCodecID;
    totalRecvBytes: number;
    audioRecvBytes: number;
    videoRecvBytes: number;
}
/**
 * Configuration for start sound level monitor.
 */
export interface ZegoSoundLevelConfig {
    /** Monitoring time period of the sound level, in milliseconds, has a value range of [100, 3000]. Default is 100 ms. */
    millisecond: number;
    /** Set whether the sound level callback includes the VAD detection result. */
    enableVAD: boolean;
}
export interface ZegoDeviceInfo {
    deviceID: string;
    deviceName: string;
}
export interface ZegoPerformanceStatus {
    cpuUsageApp: number;
    cpuUsageSystem: number;
    memoryUsageApp: number;
    memoryUsageSystem: number;
    memoryUsedApp: number;
}
/**
 * Beauty configuration param.
 *
 * Configure the whiten, rosy, smooth, and sharpen parameters for beauty.
 */
export interface ZegoEffectsBeautyParam {
    /** The whiten intensity parameter, the value range is [0,100], and the default is 50. */
    whitenIntensity: number;
    /** the rosy intensity parameter, value range [0,100], and the default is 50. */
    rosyIntensity: number;
    /** the smooth intensity parameter, value range [0,100], and the default is 50. */
    smoothIntensity: number;
    /** the sharpen intensity parameter, value range [0,100], and the default is 50. */
    sharpenIntensity: number;
}
/**
 * Mix stream audio configuration.
 *
 * Configure video frame rate, bitrate, and resolution for mixer task
 */
export interface ZegoMixerAudioConfig {
    /**
     * Audio bitrate in kbps, default is 48 kbps, cannot be modified after starting a mixer task
     */
    bitrate: number;
    /**
     * Audio channel, default is Mono
     */
    channel: ZegoAudioChannel;
    /**
     * codec ID, default is ZegoAudioCodecIDDefault
     */
    codecID: ZegoAudioCodecID;
    /**
     * Multi-channel audio stream mixing mode. If [ZegoAudioMixMode] is selected as [Focused], the SDK will select 4 input streams with [isAudioFocus] set as the focus voice highlight. If it is not selected or less than 4 channels are selected, it will automatically fill in 4 channels
     */
    mixMode: ZegoAudioMixMode;
}
/**
 * Mix stream video config object.
 *
 * Configure video frame rate, bitrate, and resolution for mixer task
 */
export interface ZegoMixerVideoConfig {
    /**
     * Video FPS, cannot be modified after starting a mixer task
     */
    fps: number;
    /**
     * Video bitrate in kbps
     */
    bitrate: number;
    /**
     * video width
     */
    width: number;
    /**
     * video height
     */
    height: number;
}
/**
 * Mixer input.
 *
 * Configure the mix stream input stream ID, type, and the layout
 */
export interface ZegoMixerInput {
    /**
     * Stream ID, a string of up to 256 characters. You cannot include URL keywords, otherwise publishing stream and playing stream will fails. Only support numbers, English characters and '~', '!', '@', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '&#46;', '<', '>', '/', '\'.
     */
    streamID: string;
    /**
     * Mix stream content type
     */
    contentType: ZegoMixerInputContentType;
    /**
     * Stream layout. When the mixed stream is an audio stream (that is, the ContentType parameter is set to the audio mixed stream type), the layout field is not processed inside the SDK, and there is no need to pay attention to this parameter.
     */
    layout: ZegoRect;
    /**
     * If enable soundLevel in mix stream task, an unique soundLevelID is need for every stream
     */
    soundLevelID: number;
    /**
     * Whether the focus voice is enabled in the current input stream, the sound of this stream will be highlighted if enabled
     */
    isAudioFocus: boolean;
}
/**
 * Mixer output object.
 *
 * Configure mix stream output target URL or stream ID
 */
export interface ZegoMixerOutput {
    /**
     * Mix stream output target, URL or stream ID, if set to be URL format, only RTMP URL surpported, for example rtmp://xxxxxxxx
     */
    target: number;
}
/**
 * Watermark object.
 *
 * Configure a watermark image URL and the layout of the watermark in the screen.
 */
export interface ZegoWatermark {
    /** Watermark image URL, only png or jpg format surpport. */
    imageURL: string;
    /** Watermark image layout */
    layout: ZegoRect;
}
/**
 * Mix stream task object.
 *
 * This class is the configuration class of the stream mixing task. When a stream mixing task is requested to the ZEGO RTC server, the configuration of the stream mixing task is required.
 * This class describes the detailed configuration information of this stream mixing task.
 */
export interface ZegoMixerTask {
    /**
     * Mix stream task ID, a string of up to 256 characters. You cannot include URL keywords, otherwise publishing stream and playing stream will fails. Only support numbers, English characters and '~', '!', '@', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '&#46;', '<', '>', '/', '\'.
     */
    taskID: string;
    /**
     * The audio configuration of the mix stream task object
     */
    audioConfig: ZegoMixerAudioConfig;
    /**
     * The video configuration of the mix stream task object
     */
    videoConfig: ZegoMixerVideoConfig;
    /**
     * The input stream list for the mix stream task object
     */
    inputList: ZegoMixerInput[];
    /**
     * The output list of the mix stream task object
     */
    outputList: ZegoMixerOutput[];
    /**
     * The watermark of the mix stream task object
     */
    watermark: ZegoWatermark;
    /**
     * The background image of the mix stream task object
     */
    backgroundImageURL: string;
    /**
     * Enable or disable sound level callback for the task. If enabled, then the remote player can get the soundLevel of every stream in the inputlist by [onMixerSoundLevelUpdate] callback.
     */
    enableSoundLevel: boolean;
    /**
     * The advanced configuration, such as specifying video encoding and others. If you need to use it, contact ZEGO technical support.
     */
    advancedConfig: {
        [key: string]: string;
    };
}
/**
 * Auto mix stream task object.
 *
 * Description: When using [StartAutoMixerTask] function to start an auto stream mixing task to the ZEGO RTC server, user need to set this parameter to configure the auto stream mixing task, including the task ID, room ID, audio configuration, output stream list, and whether to enable the sound level callback.
 * Use cases: This configuration is required when an auto stream mixing task is requested to the ZEGO RTC server.
 * Caution: As an argument passed when [StartAutoMixerTask] function is called.
 */
export interface ZegoAutoMixerTask {
    /**
     * The taskID of the auto mixer task.Description: Auto stream mixing task id, must be unique in a room.Use cases: User need to set this parameter when initiating an auto stream mixing task.Required: Yes.Recommended value: Set this parameter based on requirements.Value range: A string up to 256 bytes.Caution: When starting a new auto stream mixing task, only one auto stream mixing task ID can exist in a room, that is, to ensure the uniqueness of task ID. You are advised to associate task ID with room ID. You can directly use the room ID as the task ID.Cannot include URL keywords, for example, 'http' and '?' etc, otherwise publishing stream and playing stream will fail. Only support numbers, English characters and '~', '!', '@', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'.
     */
    taskID: string;
    /**
     * The roomID of the auto mixer task.Description: Auto stream mixing task id.Use cases: User need to set this parameter when initiating an auto stream mixing task.Required: Yes.Recommended value: Set this parameter based on requirements.Value range: A string up to 128 bytes.Caution: Only support numbers, English characters and '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'.
     */
    roomID: string;
    /**
     * The audio config of the auto mixer task.Description: The audio config of the auto mixer task.Use cases: If user needs special requirements for the audio config of the auto stream mixing task, such as adjusting the audio bitrate, user can set this parameter as required. Otherwise, user do not need to set this parameter.Required: No.Default value: The default audio bitrate is `48 kbps`, the default audio channel is `ZEGO_AUDIO_CHANNEL_MONO`, the default encoding ID is `ZEGO_AUDIO_CODEC_ID_DEFAULT`, and the default multi-channel audio stream mixing mode is `ZEGO_AUDIO_MIX_MODE_RAW`.Recommended value: Set this parameter based on requirements.
     */
    audioConfig: ZegoMixerAudioConfig;
    /**
     * The output list of the auto mixer task.Description: The output list of the auto stream mixing task, items in the list are URL or stream ID, if the item set to be URL format, only RTMP URL surpported, for example rtmp://xxxxxxxx.Use cases: User need to set this parameter to specify the mix stream output target when starting an auto stream mixing task.Required: Yes.
     */
    outputList: ZegoMixerOutput[];
    /**
     * Enable or disable sound level callback for the task. If enabled, then the remote player can get the sound level of every stream in the inputlist by [onAutoMixerSoundLevelUpdate] callback.Description: Enable or disable sound level callback for the task.If enabled, then the remote player can get the sound level of every stream in the inputlist by [onAutoMixerSoundLevelUpdate] callback.Use cases: This parameter needs to be configured if user need the sound level information of every stream when an auto stream mixing task started.Required: No.Default value: `false`.Recommended value: Set this parameter based on requirements.
     */
    enableSoundLevel: boolean;
}
export interface ZegoBroadcastMessageInfo {
    message: string;
    messageID: number;
    sendTime: number;
    fromUser: ZegoUser;
}
export interface ZegoBarrageMessageInfo {
    message: string;
    messageID: string;
    sendTime: number;
    fromUser: ZegoUser;
}
/**
 * Sound level info object.
 */
export interface ZegoSoundLevelInfo {
    /** Sound level value. */
    soundLevel: number;
    /** Whether the stream corresponding to StreamID contains voice, 0 means noise, 1 means normal voice. This value is valid only when the [enableVAD] parameter in the [ZegoSoundLevelConfig] configuration is set to true when calling [startSoundLevelMonitor]. */
    vad: number;
}
export interface ZegoVideoFrameParam {
    format: ZegoVideoFrameFormat;
    strides: number;
    size: {
        width: number;
        height: number;
    };
}
export interface ZegoVideoEncodedFrameParam {
    format: ZegoVideoEncodedFrameFormat;
    isKeyFrame: boolean;
    rotation: number;
    size: ZegoSize;
    SEIData: string;
}
export interface ZegoAudioFrameParam {
    sampleRate: ZegoAudioSampleRate;
    channel: ZegoAudioChannel;
}
/**
 * Audio configuration.
 *
 * Configure audio bitrate, audio channel, audio encoding for publishing stream
 */
export interface ZegoAudioConfig {
    /** Audio bitrate in kbps, default is 48 kbps. The settings before and after publishing stream can be effective */
    bitrate: number;
    /** Audio channel, default is Mono. The setting only take effect before publishing stream */
    channel: ZegoAudioChannel;
    /** codec ID, default is ZegoAudioCodecIDDefault. The setting only take effect before publishing stream */
    codecID: ZegoAudioCodecID;
    presetConfig(preset: ZegoAudioConfigPreset): Promise<void>;
}
export interface ZegoAudioMixingData {
    audioData: string;
    param: ZegoAudioFrameParam;
    SEIData: string;
}
export interface ZegoCustomAudioProcessConfig {
    sampleRate: ZegoAudioSampleRate;
    channel: ZegoAudioChannel;
    samples: number;
}
export interface ZegoDataRecordProgress {
    duration: number;
    currentFileSize: number;
}
export interface ZegoNetworkProbeConfig {
    enableTraceroute: boolean;
}
export interface ZegoNetworkProbeHttpResult {
    errorCode: number;
    requestCostTime: number;
}
export interface ZegoNetworkProbeTcpResult {
    errorCode: number;
    rtt: number;
    connectCostTime: number;
}
export interface ZegoNetworkProbeUdpResult {
    errorCode: number;
    rtt: number;
}
export interface ZegoNetworkProbeTracerouteResult {
    errorCode: number;
    tracerouteCostTime: number;
}
export interface ZegoNetworkProbeResult {
    httpProbeResult: ZegoNetworkProbeHttpResult;
    tcpProbeResult: ZegoNetworkProbeTcpResult;
    udpProbeResult: ZegoNetworkProbeUdpResult;
    tracerouteResult: ZegoNetworkProbeTracerouteResult;
}
export interface ZegoNetworkSpeedTestConfig {
    testUplink: boolean;
    expectedUplinkBitrate: number;
    testDownlink: boolean;
    expectedDownlinkBitrate: number;
}
export interface ZegoTestNetworkConnectivityResult {
    connectCost: number;
}
export interface ZegoNetworkSpeedTestQuality {
    connectCost: number;
    rtt: number;
    packetLostRate: number;
}
export interface ZegoAudioEffectPlayConfig {
    playCount: number;
    isPublishOut: boolean;
}
export interface ZegoAccurateSeekConfig {
    timeout: number;
}
export interface ZegoNetWorkResourceCache {
    time: number;
    size: number;
}
export interface ZegoMediaPlayer {
    /**
     * Register the event handler of mediaplayer
     *
     * @param event event type
     * @param callback callback
     */
    on<MediaPlayerEventType extends keyof ZegoMediaPlayerListener>(event: MediaPlayerEventType, callback: ZegoMediaPlayerListener[MediaPlayerEventType]): void;
    /**
     * Unregister the event handler of mediaplayer
     *
     * @param event event type
     * @param callback callback
     */
    off<MediaPlayerEventType extends keyof ZegoMediaPlayerListener>(event: MediaPlayerEventType, callback?: ZegoMediaPlayerListener[MediaPlayerEventType]): void;
    /**
     * Load media resource.
     *
     * Yon can pass the absolute path of the local resource or the URL of the network resource
     *
     * @param path the absolute path of the local resource or the URL of the network resource
     * @return the result of calling this API
     */
    loadResource(path: string): Promise<ZegoMediaPlayerLoadResourceResult>;
    /**
     * Start playing.
     *
     * You need to load resources before playing
     */
    start(): Promise<void>;
    /**
     * Stop playing.
     */
    stop(): Promise<void>;
    /**
     * Pause playing.
     */
    pause(): Promise<void>;
    /**
     * resume playing.
     */
    resume(): Promise<void>;
    /**
     * Set the view of the player playing video.
     *
     * @param view Video rendered canvas object ID
     */
    setPlayerView(playerID: number): Promise<void>;
    /**
     * Set the specified playback progress.
     *
     * Unit is millisecond
     *
     * @param millisecond Point in time of specified playback progress
     * @return the result of calling this API
     */
    seekTo(millisecond: number): Promise<ZegoMediaPlayerSeekToResult>;
    /**
     * Whether to repeat playback.
     *
     * @param enable repeat playback flag. The default is false.
     */
    enableRepeat(enable: boolean): Promise<void>;
    /**
     * Whether to mix the player's sound into the stream being published.
     *
     * @param enable Aux audio flag. The default is false.
     */
    enableAux(enable: boolean): Promise<void>;
    /**
     * Set the speed of play
     *
     * You should load resource before invoking this function
     *
     * @param speed The range is 0.5 ~ 2.0. The default is 1.0.
     */
    setPlaySpeed(speed: number): Promise<void>;
    /**
     * Whether to play locally silently.
     *
     * If [enableAux] switch is turned on, there is still sound in the publishing stream. The default is false.
     *
     * @param mute Mute local audio flag, The default is false.
     */
    muteLocal(mute: boolean): Promise<void>;
    /**
     * Set mediaplayer volume. Both the local play volume and the publish volume are set.
     *
     * @param volume The range is 0 ~ 200. The default is 60.
     */
    setVolume(volume: number): Promise<void>;
    /**
     * Set mediaplayer local play volume.
     *
     * @param volume The range is 0 ~ 200. The default is 60.
     */
    setPlayVolume(volume: number): Promise<void>;
    /**
     * Set mediaplayer publish volume.
     *
     * @param volume The range is 0 ~ 200. The default is 60.
     */
    setPublishVolume(volume: number): Promise<void>;
    /**
     * Set playback progress callback interval.
     *
     * This function can control the callback frequency of [onMediaPlayerPlayingProgress]. When the callback interval is set to 0, the callback is stopped. The default callback interval is 1s
     * This callback are not returned exactly at the set callback interval, but rather at the frequency at which the audio or video frames are processed to determine whether the callback is needed to call
     *
     * @param millisecond Interval of playback progress callback in milliseconds
     */
    setProgressInterval(millisecond: number): Promise<void>;
    /**
     * Set the audio track of the playback file.
     *
     * @param index Audio track index, the number of audio tracks can be obtained through the [audioTrackCount].
     */
    setAudioTrackIndex(index: number): Promise<void>;
    /**
     * Setting up the specific voice changer parameters.
     *
     * @param param Voice changer parameters
     * @param audioChannel The audio channel to be voice changed
     */
    setVoiceChangerParam(param: ZegoVoiceChangerParam, audioChannel: ZegoMediaPlayerAudioChannel): Promise<void>;
    /**
     * Take a screenshot of the current playing screen of the media player.
     *
     * Only in the case of calling `setPlayerCanvas` to set the display controls and the playback state, can the screenshot be taken normally
     *
     * @param callback The callback of the screenshot of the media player playing screen
     */
    takeSnapshot(): Promise<ZegoMediaPlayerTakeSnapshotResult>;
    /**
     * Open precise seek and set relevant attributes.
     *
     * Call the setting before loading the resource. After setting, it will be valid throughout the life cycle of the media player. For multiple calls to ‘enableAccurateSeek’, the configuration is an overwrite relationship, and each call to ‘enableAccurateSeek’ only takes effect on the resources loaded later.
     *
     * @param enable Whether to enable accurate seek
     * @param config The property setting of precise seek is valid only when enable is YES.
     */
    enableAccurateSeek(enable: boolean, config: ZegoAccurateSeekConfig): Promise<void>;
    /**
     * Set the maximum cache duration and cache data size of web materials.
     *
     * The setting must be called before loading the resource, and it will take effect during the entire life cycle of the media player.
     * Time and size are not allowed to be 0 at the same time. The SDK internal default time is 5000, and the size is 15*1024*1024 byte.When one of time and size reaches the set value first, the cache will stop.
     *
     * @param time The maximum length of the cache time, in ms, the SDK internal default is 5000; the effective value is greater than or equal to 2000; if you fill in 0, it means no limit.
     * @param size The maximum size of the cache, the unit is byte, the internal default size of the SDK is 15*1024*1024 byte; the effective value is greater than or equal to 5000000, if you fill in 0, it means no limit.
     */
    setNetworkResourceMaxCache(time: number, size: number): Promise<void>;
    /**
     * Get the playable duration and size of the cached data of the current network material cache queue
     *
     * @return Returns the current cached information, including the length of time the data can be played and the size of the cached data.
     */
    getNetworkResourceCache(): Promise<ZegoNetWorkResourceCache>;
    /**
     * Use this interface to set the cache threshold that the media player needs to resume playback. The SDK default value is 5000ms，The valid value is greater than or equal to 1000ms
     *
     * @param threshold Threshold that needs to be reached to resume playback, unit ms.
     */
    setNetworkBufferThreshold(threshold: number): Promise<void>;
    /**
     * Gets the current local playback volume of the mediaplayer, the range is 0 ~ 200, with the default value of 60.
     *
     * @return current play volume
     */
    getPlayVolume(): Promise<number>;
    /**
     * Gets the current publish volume of the mediaplayer, the range is 0 ~ 200, with the default value of 60.
     * @return current play volume
     */
    getPublishVolume(): Promise<number>;
    /**
     * Get the total progress of your media resources.
     *
     * You should load resource before invoking this function, otherwise the return value is 0
     *
     * @return Total duration. The unit is millisecond
     */
    getTotalDuration(): Promise<number>;
    /**
     * Get current playing progress.
     *
     * You should load resource before invoking this function, otherwise the return value is 0
     *
     * @return Current progress. The unit is millisecond
     */
    getCurrentProgress(): Promise<number>;
    /**
     * Get the count of audio tracks of the current media file.
     *
     * @return The count of audio tracks
     */
    getAudioTrackCount(): Promise<number>;
    /**
     * Get the current state of mediaplayer.
     *
     * @return Current state
     */
    getCurrentState(): Promise<ZegoMediaPlayerState>;
    /**
     * Get media player index.
     */
    getIndex(): number;
}
