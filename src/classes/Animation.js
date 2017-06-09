/**
 * Created by Nort3 on 14.05.2017.
 */
import $ from 'jquery';

export default class Animation {
    static showMessageBox(message) {
        // отображаем notification
        let messageBox = $('.message-box');
        let messageBoxText = $('.message-box__text span');

        messageBox.css('display', 'inline-block');

        messageBoxText.text(message);

        setTimeout(() => {
            let messageBox = $('.message-box');
            messageBox.css('display', 'none');
        }, 3000);
    }

    /**
     * Вспомогательный метод, добавляющий анимацию переданному элементу
     * @param elementStyle — Стиль элемента в DOM дереве
     * @param name — Имя @keyframe, который будет использоваться в качестве анимации
     * @param duration — Время продолжительности анимации (по умолчанию = 1s)
     * @param delay — Время задержки анимации (по умолчанию = 0s)
     * @param timingFunction — Временная функция анимации (по умолчанию = ease-in-out)
     * @param fillMode — fillMode анимации (по умолчанию = forwards)
     */
    static addAnimateElement(elementStyle, name, duration = '1s', delay = '0', timingFunction = 'ease-in-out', fillMode = 'forwards') {
        elementStyle.animationName = name;
        elementStyle.animationTimingFunction = timingFunction;
        elementStyle.animationDelay = delay;
        elementStyle.animationFillMode = fillMode;
        elementStyle.animationDuration = duration;
    }

    /**
     * Вспомогательный метод, добавляющий анимацию переданному элементу
     * @param flag — Флаг, определяющий какую анимацию использовать в данный момент времени (по умолчанию = false)
     * @param elementStyle — Стиль элемента в DOM дереве
     * @param nameFirstAnimation — Имя @keyframe, который будет использоваться в качестве анимации при flag = false
     * @param nameSecondAnimation — Имя @keyframe, который будет использоваться в качестве анимации при flag = true
     * @param duration — Время продолжительности анимации (по умолчанию = 1s)
     * @param delay — Время задержки анимации (по умолчанию = 0s)
     * @param timingFunction — Временная функция анимации (по умолчанию = ease-in-out)
     * @param fillMode — fillMode анимации (по умолчанию = forwards)
     */
    static toggleAnimateElement(flag = false, elementStyle, nameFirstAnimation, nameSecondAnimation, duration = '1s', delay = '0', timingFunction = 'ease-in-out', fillMode = 'forwards') {
        if (flag === false) {
            elementStyle.animationName = nameFirstAnimation;
        } else {
            elementStyle.animationName = nameSecondAnimation;
        }

        elementStyle.animationTimingFunction = timingFunction;
        elementStyle.animationDelay = delay;
        elementStyle.animationFillMode = fillMode;
        elementStyle.animationDuration = duration;
    }
}
