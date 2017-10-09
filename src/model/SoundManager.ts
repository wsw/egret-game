// TypeScript file
class SoundManager {
    private static shared: SoundManager;
    public static Shared(): SoundManager {
        if (!SoundManager.shared) {
            SoundManager.shared = new SoundManager();
        }
        return SoundManager.shared;
    }
    private _click: egret.Sound;//点击声音
    private _word: egret.Sound;//点击字块的声音
    private _right: egret.Sound;//如果胜利
    private _wrong: egret.Sound;//如果错误
    private _bgm: egret.Sound;//背景音乐
    private _bgm_channel: egret.SoundChannel;//保存用来静音用
    private _bgmChannel: egret.SoundChannel;

    public constructor() {
        this._click = new egret.Sound();
        this._click.load("resource/assets/sound/buttonclick.mp3");
        this._bgm = new egret.Sound();
        this._bgm.load("resource/assets/sound/Music.mp3");
        this._right = new egret.Sound();
        this._right.load("resource/assets/sound/right.mp3");
        this._wrong = new egret.Sound();
        this._wrong.load("resource/assets/sound/wrong.mp3");
        this._word = new egret.Sound();
        this._word.load("resource/assets/sound/type_word.mp3");
    }
    public playBackgroundMusic(): void {
        if (this.isMusic) {
            this._bgmChannel = this._bgm.play(0, 0);
        }
    }
    public stopBackgroundMusic(): void {
        if (this._bgmChannel) {
            this._bgmChannel.stop();
        }
    }
    public playClickSound(): void {
        this.isSound && this._click.play(0, 1);
    }
    public playRightSound(): void {
        this.isSound && this._right.play(0, 1);
    }
    public playWrongSound(): void {
        this.isSound && this._wrong.play(0, 1);
    }
    public playWordSound(): void {
        this.isSound && this._word.play(0, 1);
    }
    //音乐是否播放，保存设置
    public set isMusic(value: boolean) {
        if (value) {
            egret.localStorage.setItem('isMusic', '1');
            this.playBackgroundMusic();
        } else {
            egret.localStorage.setItem('isMusic', '0');
            this.stopBackgroundMusic();
        }
    }
    public get isMusic(): boolean {
        let b = egret.localStorage.getItem('isMusic');
        return b === '1' ? true : false;
    }
    //声效是否播放，保存设置
    public set isSound(value: boolean) {
        egret.localStorage.setItem('isSound', value ? '1': '0');
    }
    public get isSound(): boolean {
        return egret.localStorage.getItem('isSound') === '1';
    }
}