<script>
    import { executeClient } from '#/shared/api/rage'
    export const type;
    export const subdata;

    const emulPress = (index) => {
        executeClient ("atmCB", type, index);
    }

</script>

{#each subdata as value, index}
    {emulPress(index)}
{/each}