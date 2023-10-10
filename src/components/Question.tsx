import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Question.css';
import { ListQuestion, QuestionData } from '../assets/models/listQuestion';
import parse from 'html-react-parser'
import useSpeechSynthesis from '../assets/hooks/useSpeechSynthesis';

interface Props {
    sectionName: string
}

const Question: React.FC<Props> = (props: Props) => {
    console.info('Question')
    const {sectionName} = props;
    const [listQuestion, setListQuestion] = useState<ListQuestion>([]);
    const [questionData, setQuestionData] = useState<QuestionData>();
    const [message, setMessage] = useState<string>('');
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [answer, setAnswer] = useState<string>('');
    const [disable, setDisable] = useState<boolean>(false);
    const speak = useSpeechSynthesis('ru-RU');

    useLayoutEffect(()=>{
        try {
            const fileName = sectionName.toLowerCase();
            const store: ListQuestion = require(`../store/sections/${fileName}`).default;
            if(!store.length){
                setMessage(`Отсутствуют вопросы в файле "${fileName}"`);
            }else{
                setListQuestion(store);
                setQuestionData(store[Math.floor(Math.random()*store.length)]);
            }
        } catch (e) {
            setMessage(`Файл с вопросами по секции "${sectionName}" не найдины`);
        }
    }, [sectionName]);

    const onClickRandomQuestion = () => {
        setShowAnswer(false);
        setAnswer('');
        setQuestionData(listQuestion[Math.floor(Math.random()*listQuestion.length)]);
    }
    const onClickListenAnswer = async () => {
        setDisable(true);
        setShowAnswer(true);
        await speak(questionData?.answer || '');
        setDisable(false);
    }

    return (
        <div className="questions">
            <div className='header'>
                <div><Link to='/'>Главная</Link></div>
                <div className='section'>Раздел - {sectionName}</div>
            </div>
            {
                message ?
                    <div className='message'>{message}</div> :
                    <div className='content'>
                        <div>Вопрос:</div>
                        <div className='question'>{questionData?.question}</div>
                        <div className='your_answer'>
                            <textarea placeholder="Введите Ваш ответ" value={answer} onChange={(e)=>{setAnswer(e.currentTarget.value)}}></textarea>
                        </div>
                        <div className='answer'>
                            {showAnswer && <>{parse(questionData?.answer || '')}</>}
                        </div>
                    </div>
            }
            <div className='menu'>
                <button type="button" disabled={disable} onClick={()=>setShowAnswer(!showAnswer)}>Показать/скрыть ответ</button>
                <button type="button" disabled={disable} onClick={onClickListenAnswer}>Прослушать ответ</button>
                <button type="button" disabled={disable} onClick={onClickRandomQuestion}>Еще вопрос</button>
            </div>
        </div>
    );
}

export default Question;
