<script>
    import './main.sass';
    let buttonEl;
    export const keyCode = 0;
    export const keyLocation = 0;
    export const callback;
    export const click;
    export const classData = "";
    export const style = "";
    export const disabled = false;
    export const nonactive = false;
    export const keyDetector = false;
    export const keyDonate = false;

    let state = false;
    let laststate = false;

    const handleKeydown = (event) => {

        if(!nonactive) {
            if(!disabled && !state && keyCode === event.keyCode && keyLocation === event.location) {
                if(callback !== undefined) {

                    // 27 это клавиша Esc, мы отправляем её только после отжатия, чтобы не открывалась меню паузы gta
                    if(keyCode !== 27) {
                        callback(keyCode, false);
                    }
                }

                if(laststate) {
                    laststate = false;
                    setTimeout(() => laststate = true, 0);
                }
                else laststate = true; 
                state = true;
            }
        }
    }
    
    const handleKeyup = (event) => {
        if(state && keyCode === event.keyCode) {

            // 27 это клавиша Esc, мы отправляем её только после отжатия, чтобы не открывалась меню паузы gta
            if(keyCode === 27) {
                if (callback !== undefined) {
                    callback(keyCode, false);
                }
            }
            state = false;
        }
    }

    const onClick = (event) => {
        if(click !== undefined) {
            click();
        }

        if(!nonactive) {
            if(callback !== undefined)
                callback(keyCode, true);
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup}/>

<div class="KeyAnimation {classData}" class:active={laststate} class:keyDetector={keyDetector} class:keyDonate={keyDonate} class:pressed={state} class:disabled={disabled} class:nonactive={nonactive} on:click bind:this={buttonEl} style={style}>
    <slot/>
</div>