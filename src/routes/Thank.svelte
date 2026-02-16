<!-- <script lang="ts">
	import { localdata, pageNo } from "$lib/store";

	const daytime = $localdata.time;
	const lastnum = String(daytime).slice(-8);

	let lastTap = 0;
	// let isEnd = false;
	const doubleTapThreshold = 300;

	const handleChance = () => {
		// isEnd = true;
		const updatedData = { ...$localdata, yet: true };
		localdata.set(updatedData);
		localStorage.setItem("user", JSON.stringify(updatedData));
		pageNo.set(3);
		window.scroll({ top: 0, behavior: "smooth" });
	};

	function handleTouch(event: PointerEvent) {
		const currentTime = new Date().getTime();
		const tapLength = currentTime - lastTap;

		if (tapLength < doubleTapThreshold && tapLength > 0) {
			handleChance();
		}
		lastTap = currentTime;
	}
</script>

<svelte:head>
	<title>抽選券GET</title>
</svelte:head>
<svelte:window onpointerdown={handleTouch} />

<div
	class="flex flex-col h-5xl items-center text-center bg-red-50 p-3 m-2 rounded-2xl"
>
	<div class="text-lg font-semibold">
		アンケートのご協力<br />
		ありがとうございました。
	</div>

	<div class="text-5xl m-5">
		抽選券<br />
		{lastnum}
	</div>

	<div class="my-5 font-semibold animate-bounce">
		<div class="text-red-500 text-3xl">お楽しみ抽選会</div>
		<div class="text-xl">スタッフに見せてください</div>
	</div>
	<div class="relative w-full max-w-md p-2">
		<img
			src="https://www.thekeepcast.com/wp/wp-content/uploads/2026/01/MAP2026.2_ol-scaled.jpg"
			alt="map"
		/>
		<div
			class="absolute bottom-5 left-2 text-red-500 text-5xl animate-ping"
		>
			★
		</div>
	</div>
</div> -->
<script lang="ts">
    import { localdata, pageNo } from "$lib/store";

    const daytime = $localdata.time;
    const lastnum = String(daytime).substring(3, 9);

    let lastTap = 0;
    const doubleTapThreshold = 300;

    const handleChance = () => {
        const updatedData = { ...$localdata, yet: true };
        localdata.set(updatedData);
        localStorage.setItem("user", JSON.stringify(updatedData));
        pageNo.set(3);
        window.scroll({ top: 0, behavior: "smooth" });
    };

    function handleTouch(event: PointerEvent) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;

        if (tapLength < doubleTapThreshold && tapLength > 0) {
            handleChance();
        }
        lastTap = currentTime;
    }
</script>

<svelte:head>
    <title>抽選券表示</title>
</svelte:head>
<svelte:window onpointerdown={handleTouch} />

<div class="min-h-screen bg-slate-100 p-4 font-sans text-slate-800 flex flex-col items-center">


    <div class="w-full max-w-sm bg-white rounded-3xl shadow-xl mt-8 overflow-hidden border border-slate-200">
        
        <div class="bg-red-500 p-4 text-white text-center">

            <h3 class="text-2xl font-black mt-1">お楽しみ抽選券</h3>
			<p class="text-xs font-bold text-slate-100 mb-2 tracking-widest uppercase">Your Number</p>
        </div>

        <div class="p-8 text-center relative">
            <!-- <div class="absolute -left-3 top-0 bottom-0 flex flex-col justify-around">
                {#each Array(6) as _}<div class="w-6 h-6 bg-slate-100 rounded-full border border-slate-200 shadow-inner"></div>{/each}
            </div>
            <div class="absolute -right-3 top-0 bottom-0 flex flex-col justify-around">
                {#each Array(6) as _}<div class="w-6 h-6 bg-slate-100 rounded-full border border-slate-200 shadow-inner"></div>{/each}
            </div> -->

            <div class="text-5xl font-mono font-black text-slate-900 tracking-tighter">
                {lastnum}
            </div>
        </div>

        <div class="border-t-4 border-dotted border-slate-100 relative">
        </div>

        <div class="p-6 bg-slate-50 text-center space-y-4">
            <div class="animate-bounce inline-block bg-white px-4 py-2 rounded-full shadow-sm border border-red-200">
                <span class="text-red-500 font-black text-sm">スタッフにこの画面を見せてください</span>
            </div>
            
            <div class="relative rounded-2xl overflow-hidden border-2 border-white shadow-md">
                <img
                    src="https://www.thekeepcast.com/wp/wp-content/uploads/2026/01/MAP2026.2_ol-scaled.jpg"
                    alt="会場マップ"
                    class="w-full h-auto"
                />
                <div class="absolute bottom-2 left-2 text-red-500 text-4xl animate-ping select-none">
                    ★
                </div>
          
            </div>
            <p class="text-[10px] text-slate-400 font-bold">抽選会場はマップの★印の場所です</p>
        </div>
    </div>

    <p class="mt-8 text-slate-400 text-[10px] font-medium tracking-widest uppercase">Thank you for your cooperation</p>
</div>

<style>
    /* 番号を見やすくするためのフォント（任意） */
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@700&display=swap');
    .font-mono {
        font-family: 'Roboto Mono', monospace;
    }
</style>