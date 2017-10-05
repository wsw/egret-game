// TypeScript file
class AnswerWord extends Word {
    public selectWord: Word = null;
    public constructor() {
        super();
    }
    protected onclick_tap() {
        if (this.selectWord) {
            this.selectWord.visible = true;
            this.selectWord = null;
            this.setWordText('');
        }
        console.log('AnswerWord');
    }
    public setSelectWord(word: Word) {
        if (word !== null) {
            word.visible = false;
            this.setWordText(word.getWordText());
           this.selectWord = word;
        } else {
            this.setWordText('');
            this.selectWord = null;
        }
    }
}