import { RNCamera } from 'react-native-camera';
import { useState } from 'react';
import { Alert } from 'react-native';

export class FlashModeService {
    getNewFlashMode = () => {
        if (flashMode === RNCamera.Constants.FlashMode.off) {
            return RNCamera.Constants.FlashMode.torch;
        } else {
            return RNCamera.Constants.FlashMode.off;
        }
    };
}

export class CameraService {
    isBackCamera = () => {
        return cameraType === RNCamera.Constants.Type.back;
    };

    getNewCameraType = () => {
        if (this.isBackCamera(cameraType)) {
            return RNCamera.Constants.Type.front;
        } else {
            return RNCamera.Constants.Type.back;
        }
    };
}

export class TimerService {
    // private _timerId: NodeJS.Timer | null = null;

    stopTimer = () => {
        if (this._timerId) {
            clearInterval(this._timerId);
            this._timerId = null;
        }
    };

    startTimer = () => {
        if (!this._timerId) {
            this._timerId = setInterval(cb, 1000);
        }
    };
}


const timerService = new TimerService();

const useCamera = () => {
    const [recording, setRecording] = useState(false);
    const [seconds, setSeconds] = useState(45);

    const cameraActionProxy = () => {
        if (!ref) {
            return () => void 0;
        }
        return () => cb(ref);
    };

    const takePicture = async () => {
        try {
            const { uri } = await camera.takePictureAsync();
            // do anything you want with the uri of the image
            // for example, take to the preview screen
            // navigation.navigate('ImagePreview', {uri});
            Alert.alert('Image', uri);
        } catch (e) {
            console.log('Failed to take a picture: ', e);
        }
    };

    const startRecordingVideo = async () => {
        try {
            timerService.startTimer(countdown);
            setRecording(true);
            const { uri } = await camera.recordAsync();
            // do anything you want with the uri of the video
            // for example, take to the preview screen
            // navigation.navigate('VideoPreview', {uri});
            Alert.alert('Video', uri);
        } catch (e) {
            console.log('Failed to start recording: ', e);
        }
    };

    const stopRecordingVideo = async () => {
        if (!recording) {
            return;
        }
        try {
            timerService.stopTimer();
            setSeconds(45);
            setRecording(false);
            await camera.stopRecording();
        } catch (e) {
            console.log('Failed to stop recording: ', e);
        }
    };

    const countdown = () => {
        setSeconds(prevSeconds => {
            const newSeconds = prevSeconds - 1;
            if (newSeconds === 0) {
                timerService.stopTimer();
                cameraActionProxy(stopRecordingVideo)();
            }
            return newSeconds;
        });
    };

    return {
        seconds,
        recording,
        takePicture: cameraActionProxy(takePicture),
        startRecordingVideo: cameraActionProxy(startRecordingVideo),
        stopRecordingVideo: cameraActionProxy(stopRecordingVideo),
    };
};

export default useCamera;
