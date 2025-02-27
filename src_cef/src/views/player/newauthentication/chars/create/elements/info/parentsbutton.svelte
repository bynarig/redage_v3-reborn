<script>
    import parents from './parents.js';
    
    export const gender = false;
    export const value = 0;
    export const active = false;
    export const onChange;

    const OnChangeParent = (change) => {
        value += change;

        if (value < 0) value = parents[gender].length - 1;
        else if (value >= parents[gender].length) value = 0;

        if (onChange)
            onChange(value);
    }

    const handleKeyUp = event => {
        if (!active) return;
        const { keyCode } = event;
        
        switch (keyCode) {
            case 37: // left
                OnChangeParent(-1);
                break;
            case 39: // right
                OnChangeParent(1);
                break;
        }
    }
</script>

<svelte:window on:keyup={handleKeyUp} />

<div class="auth__box-arrows" on:click>
    <span class="auth-arrow-left auth__customization_icon" on:click={() => OnChangeParent(-1)} />
    <div class="auth__customization_text">{parents[gender][value].name}</div>
    <span class="auth-arrow-right auth__customization_icon" on:click={() => OnChangeParent(1)} />
</div>