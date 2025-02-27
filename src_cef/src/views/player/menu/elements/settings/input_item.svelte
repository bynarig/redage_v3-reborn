<script>
    import rangeslider from 'components/rangeslider/index'
    import { executeClient } from 'api/rage'
    export const id;
    export const min;
    export const max;
    export const step;
    export const callback;
    export const value;

    const createSlider = () => {

        const sliderInput = document.getElementById(id);
        if(sliderInput == undefined) return;

        const sliderHandle = sliderInput['rangeslider-js'];
        if(sliderHandle !== undefined) return;
        rangeslider.create(document.getElementById(id), {min: min, max: max, value: value, step: step,
            onSlide: (value, percent, position) => {
                callback(Number(value))
                executeClient("client.camera.toggled", false)
            },
            onSlideStart: (value, percent, position) => {
                executeClient("client.camera.toggled", false)
            },
            onSlideEnd: (value, percent, position) => {
                executeClient("client.camera.toggled", true)
            },
        });
    }

    $: {
        const sliderInput = document.getElementById(id);
        if(sliderInput) {
            const sliderHandle = sliderInput['rangeslider-js'];
            if(sliderHandle && value !== sliderHandle.value) {
                sliderHandle.update({value: value});                
            }
        }

    }
</script>

<div class="sound__input-block">
    <input class="sound__input" type="range" id={id} use:createSlider>
    <!--<div class="sound__input__value sound__text_small">
        <div>{leftText}</div>
        <div>{rightText}</div>
    </div>-->
</div>