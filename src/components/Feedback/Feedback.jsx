import { useState , useCallback} from 'react';


import Statistic from './Statistic';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';
import Notification from './Notification';

const options = ['good', 'neutral', 'bad']

const Feedback = () => {
    const [state, setState] = useState({
        good: 0,
        neutral: 0,
        bad: 0 ,
    })

    const onClick = useCallback(
        item => {
            setState(prevState => ({
                ...prevState,
                [item]: prevState[item] +1,
            }))
        },
        [setState]
    )

    const items = Object.values(state);
    const total = items.reduce((item, acc) => (acc += item), 0);

    const goodFeedback = state.good;
  const positiveFeedback = Math.ceil((goodFeedback / total) * 100);

    const {  neutral, good, bad } = state;
    return (
    <>
        <Section title={'Please Live Feedback'}>
        <FeedbackOptions options={options} onLeaveFeedback={onClick} />
        </Section>

        <Section title={'Statistics'}>
        {total ? (
            <Statistic
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positiveFeedback}
            />
        ) : (
            <Notification message={'There is no feedback'} />
        )}
        </Section>
    </>
    );

}

export default Feedback