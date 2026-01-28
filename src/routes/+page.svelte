<script lang="ts">
  import Form from "./Form.svelte";
  import Thank from "./Thank.svelte";
  import Yet from "./Yet.svelte";
  import { localdata, pageNo, type LocalData } from "$lib/store";
  import { onMount } from "svelte";

  let isopen = $state<boolean | null>(null);

  function checkOpenTime() {
    const now = new Date();
    const hour = now.getHours();
    // 判定結果（boolean）を代入
    isopen = hour >= 9 && hour < 24;
  }

  $effect(() => {
    checkOpenTime();
    const timer = setInterval(checkOpenTime, 5000);
    return () => clearInterval(timer);
  });

  onMount(() => {
    let userData = JSON.parse(
      localStorage.getItem("user") || "{}",
    ) as Partial<LocalData>;
    let { isSubmit = false, yet = false, time } = userData;
    const nowtime = new Date().getTime();
    console.log(nowtime);
    if (nowtime - time > 8 * 60 * 60 * 1000) {
      localStorage.removeItem("user");
      pageNo.set(1);
      return;
    }
    if (!isSubmit && !yet) {
      pageNo.set(1);
      return;
    }
    if (isSubmit && !yet) {
      if (typeof time === "number") {
        localdata.set({ isSubmit, yet, time });
        pageNo.set(2);
      } else {
        // Handle case where time is missing but isSubmit is true (shouldn't happen normally)
        pageNo.set(1);
      }
      return;
    }
    if (isSubmit && yet) {
      pageNo.set(3);
      return;
    }
  });
</script>

{#if isopen == null}
  <div class="h-screen bg-white"></div>
{:else if isopen}
  {#if $pageNo === 1}
    <Form />
  {:else if $pageNo === 2}
    <Thank />
  {:else if $pageNo === 3}
    <Yet />
  {/if}
{:else}
  <p class="text-red-500 text-center">現在は時間外です（分単位テスト中）</p>
{/if}
