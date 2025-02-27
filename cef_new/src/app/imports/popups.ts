import PopupInput from '#/popups/input/index.svelte';
import PopupConfirm from '#/popups/confirm/index.svelte';
import HospitalPopupConfirm from '#/popups/confirm/hospital_index.svelte';
import PopupDonate from '#/popups/donate/index.svelte';
import PopupDeath from '#/popups/death/index.svelte';
import CircleMenu from '#/popups/circle/index.svelte';
//import PopupAuth from '#/popups/auth/index.svelte';
import PopupMain from '#/popups/main/index.svelte';
import PopupSelect from '#/popups/select/index.svelte';
import PopupRoulette from '#/popups/roulette/index.svelte';
import PopupUpgrade from '#/popups/upgrade/index.svelte';
import PopupCamera from '#/popups/camera/index.svelte';
import PopupWar from '#/popups/war/index.svelte';


let Popups;
export default Popups = {
    PopupConfirm,
    HospitalPopupConfirm,
    PopupInput,
    PopupDeath,
    PopupDonate,
    CircleMenu,
    PopupSelect,
    PopupMain,
    PopupUpgrade,
    PopupRoulette,
    PopupCamera,
    PopupWar,
};