// TypeScript file
class LevelDataItem {
    public answer: string;
    public img: string;
    public word: string;
    public tip: string;
    public content: string;
}

class LevelDataManager {
    public static shared: LevelDataManager;
    public static Shared() {
        if (!LevelDataManager.shared) {
            LevelDataManager.shared = new LevelDataManager();
        }
        return LevelDataManager.shared;
    }
    private items: LevelDataItem[] = [];

    public constructor() {
        this.items = RES.getRes('questions_json');
    }
    public getLevel(level: number): LevelDataItem {
        if (level < 0) level = 0;
        if (level >= this.items.length) level = this.items.length - 1; 
        return this.items[level]; 
    }
    public get milestone(): number {
        let milestone = egret.localStorage.getItem('CYDTZ_Milestone');
        if (!milestone){
            milestone = "1";
        }
        return parseInt(milestone);
    }
    public set milestone(value: number) {
        egret.localStorage.setItem("CYDTZ_Milestone",value.toString());
    }
}