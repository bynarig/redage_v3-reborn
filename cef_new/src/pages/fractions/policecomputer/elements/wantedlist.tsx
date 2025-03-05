<script>
    import { executeClient } from '#/shared/api/rage';
    import { translateText } from '#/shared/locale'
    export const wantedData;
</script>

<h1>{translateText('fractions', 'Сейчас в розыске')}</h1>
<div class="elements">
    <ol>
        {#each wantedData as value, index}
            <li>{value}</li>
        {/each}
    </ol>
</div>