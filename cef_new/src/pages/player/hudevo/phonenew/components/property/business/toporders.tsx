<script>
    import { translateText } from '#/shared/locale'
    import { format } from '#/shared/api/formatter'
    import { getPng } from './data'

    export const onSelectedViewBusiness;

    import { executeClientToGroup } from "api/rage";
    executeClientToGroup ("business.loadStats");

    import LoaderSmall from './../../loadersmall.svelte'
    let isLoad = false;

    let data = []

    const initTime = (jsonStats, jsonProducts, jsonUsers) => {

        data = JSON.parse(jsonProducts);

        isLoad = true;
    }

    import { addListernEvent } from '#/shared/api/functions';
    addListernEvent ("phoneBusinessStatsInit", initTime);
    import { fade } from 'svelte/transition'
</script>

{#if !isLoad}
    <LoaderSmall />
{:else}
    <div class="newphone__rent_list" in:fade>
        <div class="newphone__project_title w-100 fs-18">{translateText('player2', 'Топ товаров за сегодня')}:</div>
        {#each data as item, index}
            <div class="newphone__rent_none hover">
                <div class="box-column">
                    <div class="box-flex">
                        <div class="violet">{item.name}</div>
                    </div>
                    <div class="gray">{translateText('player2', 'Место')}: <span class="violet">{index + 1}</span></div>
                    <div class="gray mt-5">{translateText('player2', 'Прибыль')}: <span class="green">${format("money", item.price)}</span></div>
                </div>
                <div class="newphone__rent_noneimage person" style="background-image: url({getPng(item.productType, item.name, item.itemId)})"></div>
            </div>
        {/each}
        <div class="violet box-center m-top10" on:click={() => onSelectedViewBusiness ("Menu")}>{translateText('player2', 'Назад')}</div>
    </div>
{/if}