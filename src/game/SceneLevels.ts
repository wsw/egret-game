// TypeScript file
class SceneLevel extends eui.Component {
    public static shared: SceneLevel;
    public static Shared() {
        if (!SceneLevel.shared) {
            SceneLevel.shared = new SceneLevel();
        }
        return SceneLevel.shared;
    }
    private btn_back: eui.Button;
    private group_levels: eui.Group;
    private img_arrow:eui.Image;
    private sel_level: number = 0;
    private levelIcons: LevelIcon[] = [];
    public constructor () {
        super();
        this.skinName = 'SceneLevelsSkin';
    }
    protected childrenCreated(): void {
        var row = 20;
        var col = 10;
        var spanx = 720 / col;      //计算行x间隔
        var spany = 1136 / row;      //计算列y间隔
        this.group_levels.width = 720;
        this.group_levels.height = spany * 400;

        for(var i = 0; i <= (this.group_levels.height / 1136); i++) {
            var img = new eui.Image();
            img.source = RES.getRes("GameBG2_jpg");
            img.y = i * 1136;
            img.touchEnabled = false;
            this.group_levels.addChild(img);
        }

        this.group_levels.scrollV = this.group_levels.height;

        // //以正弦曲线绘制关卡图标的路径
        let milestone = LevelDataManager.Shared().milestone;
        for (let i = 0; i < 400; i++) {
            let icon: LevelIcon = new LevelIcon();
            icon.level = i + 1;
            icon.y = this.group_levels.height - spany * (i + 2) + 1136;
            icon.x = Math.sin(spany * i / 2 * Math.PI / 180) * 200 + this.group_levels.width / 2;
            this.group_levels.addChild(icon);
            icon.enabled = i < milestone;
            icon.currentState = icon.enabled ? '' : 'disabled';
            icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_level, this);
            this.levelIcons.push(icon);
        }

        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_back, this);
    }
    public onclick_level (e: egret.TouchEvent) {
        SoundManager.Shared().playClickSound();
        let icon = <LevelIcon>e.currentTarget;
        this.parent.addChild(SceneGame.Shared());
        SceneGame.Shared().initLevel(icon.level);
        this.parent.removeChild(this);
    }
    public openLevel(level: number) {
        let icon = this.levelIcons[level - 1];
        icon.enabled = true;
        icon.currentState = icon.enabled ? '' : 'disabled';
        if (level > LevelDataManager.Shared().milestone) {
            LevelDataManager.Shared().milestone = level;
            this.sel_level = icon.level;
        }
    }
    public onclick_back () {
        this.parent.addChild(SceneBegin.Shared());
        this.parent.removeChild(this);
    }
}