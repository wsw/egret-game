// TypeScript file
class SceneBegin extends eui.Component {
    public static shared: SceneBegin;
    public static Shared () {
        if (!SceneBegin.shared) {
            SceneBegin.shared = new SceneBegin();
        }
        return SceneBegin.shared;
    }

    private btn_begin: eui.Button;
    private btn_setting: eui.Button;

    public constructor () {
        super();
        this.skinName = 'SceneBeginSkin';
        SoundManager.Shared().PlayBGM();
    }

    public childrenCreated (): void {
        this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_begin, this);
        this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_setting, this);
    }

    public onclick_begin (): void {
        SoundManager.Shared().PlayClick();
        this.parent.addChild(SceneLevel.Shared());
        this.parent.removeChild(this);
    }
    public onclick_setting(): void {
        this.parent.addChild(GameSetting.Shared());
    }
}