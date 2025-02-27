<script>
    import characteristics from './characteristics.js';

    export const key = "";
    export const active = false;
    export const preset = 0;
    export const onChange;

    const OnChangePreset = (change) => {
        if (onChange)
            onChange(change); //key, preset, presetSettings.x, presetSettings.y);
    }

    const handleKeyUp = event => {
        if (!active) return;
        const { keyCode } = event;
        switch (keyCode) {
            case 37: // left
                OnChangePreset(-1);
                break;
            case 39: // right
                OnChangePreset(1);
                break;
        }
    }
</script>

<svelte:window on:keyup={handleKeyUp} />

<div class="auth__box-arrows" on:click>
    <span class="auth-arrow-left auth__customization_icon" on:click={() => OnChangePreset(-1)} />
    <div class="auth__customization_text">{preset === 3 ? "Кастомный" : characteristics[key][preset].name}</div>
    <span class="auth-arrow-right auth__customization_icon" on:click={() => OnChangePreset(1)} />
</div>