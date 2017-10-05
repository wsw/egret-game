// TypeScript file
class SceneGame extends eui.Component {
    public static shared: SceneGame;
    public static Shared(): SceneGame {
        if (!SceneGame.shared) {
            SceneGame.shared = new SceneGame();
        }
        return SceneGame.shared;
    }
     //对象变量
    private group_answer: eui.Group;
    private group_words: eui.Group;
    private img_question: eui.Image;
    private btn_back: eui.Group;
    private levelIndex: number;

    private group_win: eui.Group;//胜利界面的group控件
    private btn_next: eui.Button;//下一个题目
    private lb_explain: eui.Label;//解释
    private lb_from: eui.Label;//来源

    public constructor() {
        super();
        this.skinName = 'SceneGameSkin';
    }
    protected childrenCreated(): void {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_back, this);
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_next, this);
    }
    public onclick_back() {
        this.parent.addChild(SceneLevel.Shared());
        this.parent.removeChild(this);
    }
    public initLevel(level: number) {
        this.levelIndex = level;
        let levelData = LevelDataManager.Shared().getLevel(level);
        let words = levelData.answer + levelData.word;
        if (words.length === 10) {
            let i = Math.floor(Math.random() * 400);
            if (i === level) i += 1;
            let temp = LevelDataManager.Shared().getLevel(i);
            words += temp.answer + temp.word;
        }
        let wordList: string[] = words.split('');
        let wordsLg: number = this.group_words.numChildren;
        for (let i = 0; i < wordsLg; i++) {
            let wordrect = <Word>this.group_words.getChildAt(i);
            wordrect.setWordText(wordList[i]);
            wordrect.visible = true;
        }
        let answerLg: number = this.group_answer.numChildren;
        for (let i = 0; i < answerLg; i++) {
            let answerrect = <AnswerWord>this.group_answer.getChildAt(i);
            answerrect.setSelectWord(null);
            answerrect.visible = true;
            answerrect.selectWord = null;
        }
        this.img_question.source = 'resource/assets/' + levelData.img;
    }

    public onclick_word(word: Word) {
        let sel: AnswerWord;
        for (let i = 0; i < this.group_answer.numChildren; i++) {
            let answer = <AnswerWord>this.group_answer.getChildAt(i);
            if (answer.selectWord === null) {
                sel = answer;
                break;
            }
        }
        if (sel) {
            sel.setSelectWord(word);
            let check: string = '';
            for (let i = 0; i < this.group_answer.numChildren; i++) {
                let answer = <AnswerWord>this.group_answer.getChildAt(i);
                check += answer.getWordText();
            }
            if (check === LevelDataManager.Shared().getLevel(this.levelIndex).answer) {
                this.showWin();
            } else if (check.length === 4) {
                SoundManager.Shared().PlayWrong();
            }
        }
    }
    private showWin() {
        this.group_win.visible = true;
        let levelData = LevelDataManager.Shared().getLevel(this.levelIndex);
        this.lb_from.text = levelData.content;
        this.lb_explain.text = levelData.tip;
    }
    private onclick_next() {
        this.group_win.visible = false;
        SceneLevel.Shared().openLevel(this.levelIndex + 1);
        this.initLevel(this.levelIndex + 1);
    }
}