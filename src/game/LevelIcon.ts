// TypeScript file
class LevelIcon extends eui.Component {
    private lb_level: eui.Label;
    public constructor () {
        super();
        this.skinName = 'LevelIconSkin';
    }
    public get level (): number {
        return parseInt(this.lb_level.text);
    }
    public set level (value: number) {
        this.lb_level.text = value.toString();
    }
}