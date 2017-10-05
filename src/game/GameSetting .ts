// TypeScript file
class GameSetting extends eui.Component {
    private static shared: GameSetting;
    public static Shared() {
        if (!GameSetting.shared) {
            GameSetting.shared = new GameSetting();
        }
        return GameSetting.shared;
    }
    private btn_agree: eui.Button;       //同意按钮，相当于直接关闭界面
    private img_music_disable: eui.Image;//音乐静音显示
    private img_sound_disable: eui.Image;//声音静音显示
    private btn_sound: eui.Button;      //声音按钮
    private btn_music: eui.Button;      //音乐按钮 
    
    public constructor() {
        super();
        this.skinName = 'GameSettingSkin';
    }
    protected childrenCreated(): void {
        this.btn_agree.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click_agree, this);
        this.btn_music.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click_music, this);
        this.btn_sound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click_sound, this);
        this.update_buttonstate();
    }
    private click_agree() {
        SoundManager.Shared().PlayClick();
        this.parent.removeChild(this);
    }
    private click_music() {
        SoundManager.Shared().PlayClick();
        SoundManager.Shared().IsMusic = !SoundManager.Shared().IsMusic;
        this.update_buttonstate();
    }
    private click_sound() {
        SoundManager.Shared().PlayClick();
        SoundManager.Shared().IsSound = !SoundManager.Shared().IsSound;
        this.update_buttonstate();
    }
    private update_buttonstate () {
        this.img_music_disable.visible = !SoundManager.Shared().IsMusic;
        this.img_sound_disable.visible = !SoundManager.Shared().IsSound;
    }
}