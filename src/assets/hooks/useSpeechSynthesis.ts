const useSpeechSynthesis = (lang: string) => {
    const audio = new SpeechSynthesisUtterance();
    audio.lang = lang;
    return (text: string) => {
        audio.text = text;
        window.speechSynthesis.speak(audio);
        return new Promise(resolve => {
            audio.onend = resolve;
        });
    }
}

export default useSpeechSynthesis;