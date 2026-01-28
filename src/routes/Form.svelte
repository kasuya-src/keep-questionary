<script lang="ts">
	import { saveFormData } from "$lib/index";
	import { localdata, pageNo } from "$lib/store";
	import { QuestionnaireSchema } from "$lib/schema";
	import type { FormErrors } from "$lib/schema";
	import type { yetForm } from "$lib/type";

	let formdata = $state<yetForm>({
		age: "",
		gender: "",
		area: "",
		meate: [],
		nowang: [],
		futureang: [],
		hosi: null,
		history: "",
	});

	let formErrors = $state<FormErrors>({});

	const selectAge = [
		"10代未満",
		"10代",
		"20代",
		"30代",
		"40代",
		"50代",
		"60代以上",
	];
	const selectGender = ["男性", "女性", "その他"];
	const selectHosi = [1, 2, 3, 4, 5];
	const selectArea = [
		"北海道",
		"東北",
		"北関東",
		"南関東",
		"東海",
		"北陸",
		"近畿",
		"中国",
		"四国",
		"九州",
		"沖縄",
		"海外'foreign country'",
	];
	const selectMeate = [
		"限定品",
		"アウトレット商品",
		"新製品",
		"トークショー",
		"プロアングラー",
		"友達に会う",
		"飲食ブース",
		"ロッド",
		"リール",
		"なし",
	];
	const selectHistory = ["1年未満", "1年〜3年", "3年〜5年", "5年以上"];
	const selectAng = [
		"バス",
		"シーバス",
		"イカ",
		"マダイ",
		"マグロ",
		"その他ソルトフィッシング",
		"エリアトラウト",
		"ネイティブトラウト",
		"その他",
	];

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		const parsed = QuestionnaireSchema.safeParse(formdata);

		if (!parsed.success) {
			formErrors = parsed.error.flatten().fieldErrors;
			scrollToFirstError(formErrors);
			return;
		}

		const createdAt = new Date().getTime();
		const updatedData = { ...$localdata, isSubmit: true, time: createdAt };

		localdata.set(updatedData);
		localStorage.setItem("user", JSON.stringify(updatedData));

		const result = await saveFormData(parsed.data);

		if (result.success) {
			pageNo.set(2);
		} else {
			alert("データの保存に失敗しました");
		}
	}

	function clearError(key: keyof FormErrors) {
		if (formErrors[key]) {
			formErrors = { ...formErrors, [key]: undefined };
		}
	}

	function scrollToFirstError(errors: Record<string, string[]>) {
		const firstKey = Object.keys(errors)[0];
		if (!firstKey) return;

		const el = document.querySelector(
			`[data-field="${firstKey}"]`,
		) as HTMLElement | null;

		el?.scrollIntoView({
			behavior: "smooth",
			block: "center",
		});
	}
</script>

<svelte:head>
	<title>アンケート</title>
</svelte:head>

<form onsubmit={handleSubmit} class="bg-sky-50 w-screen p-5">
	<div
		class="flex flex-col gap-5 w-full max-w-md p-5 mx-auto bg-white rounded-2xl"
	>
		<label data-field="age">
			年代
			<select
				bind:value={formdata.age}
				onchange={() => clearError("age")}
				class="border-b-black border-b p-2 w-5/6"
			>
				<option value="" disabled class="hidden text-gray-500"
					>年代を選択してください</option
				>
				{#each selectAge as item}
					<option value={item}>{item}</option>
				{/each}
			</select>
			{#if formErrors.age}
				<p class="text-red-500 text-xs text-right">
					{formErrors.age[0]}
				</p>
			{/if}
		</label>

		<label data-field="gender">
			性別
			<select
				bind:value={formdata.gender}
				onchange={() => clearError("gender")}
				class="border-b-black border-b p-2 w-5/6"
			>
				<option value="" disabled class="hidden text-gray-500"
					>選択してください</option
				>
				{#each selectGender as g}
					<option value={g}>{g}</option>
				{/each}
			</select>
			{#if formErrors.gender}
				<p class="text-red-500 text-xs text-right">
					{formErrors.gender[0]}
				</p>
			{/if}
		</label>

		<label data-field="area">
			地域
			<select
				bind:value={formdata.area}
				onchange={() => clearError("area")}
				class="border-b-black border-b p-2 w-5/6"
			>
				<option value="" disabled class="hidden text-gray-500"
					>選択してください</option
				>
				{#each selectArea as a}
					<option value={a}>{a}</option>
				{/each}
			</select>
			{#if formErrors.area}
				<p class="text-red-500 text-xs text-right">
					{formErrors.area[0]}
				</p>
			{/if}
		</label>

		<label data-field="history">
			釣歴
			<select
				bind:value={formdata.history}
				onchange={() => clearError("history")}
				class="border-b-black border-b p-2 w-5/6"
			>
				<option value="" disabled class="hidden text-gray-500"
					>選択してください</option
				>
				{#each selectHistory as item}
					<option value={item}>{item}</option>
				{/each}
			</select>
			{#if formErrors.history}
				<p class="text-red-500 text-xs text-right">
					{formErrors.history[0]}
				</p>
			{/if}
		</label>

		<div class="mt-3" data-field="meate">
			<div>
				お目当て<span
					class="text-red-500 text-xs items-center font-semibold"
				>
					※複数選択可</span
				>
			</div>
			{#if formErrors.meate}
				<p class="text-red-500 text-xs text-right">
					{formErrors.meate[0]}
				</p>
			{/if}
			{#each selectMeate as elm}
				<label class="flex items-center ml-5">
					<input
						type="checkbox"
						value={elm}
						name="meate"
						bind:group={formdata.meate}
						onchange={() => clearError("meate")}
						class="size-4"
					/>
					{elm}
				</label>
			{/each}
		</div>

		<div class="mt-3" data-field="nowang">
			<div>
				やっている釣り
				<span class="text-red-500 text-xs items-center font-semibold">
					※複数選択可</span
				>
			</div>
			{#if formErrors.nowang}
				<p class="text-red-500 text-xs text-right">
					{formErrors.nowang[0]}
				</p>
			{/if}
			{#each selectAng as elm}
				<label class="flex items-center ml-5">
					<input
						type="checkbox"
						value={elm}
						name="nowang"
						bind:group={formdata.nowang}
						onchange={() => clearError("nowang")}
						class="size-4"
					/>
					{elm}
				</label>
			{/each}
		</div>

		<div class="mt-3" data-field="futureang">
			<div>
				やってみたい釣り
				<span class="text-red-500 text-xs items-center font-semibold">
					※複数選択可</span
				>
			</div>
			{#if formErrors.futureang}
				<p class="text-red-500 text-xs text-right">
					{formErrors.futureang[0]}
				</p>
			{/if}
			{#each selectAng as elm}
				<label class="flex items-center ml-5">
					<input
						type="checkbox"
						value={elm}
						name="futureang"
						bind:group={formdata.futureang}
						onchange={() => clearError("futureang")}
						class="size-4"
					/>
					{elm}
				</label>
			{/each}
		</div>

		<div data-field="hosi" class="mt-3">
			KEEPCAST2026 満足度 <span
				class="text-red-500 text-xs items-center font-semibold"
				>※必須</span
			>
			{#if formErrors.hosi}
				<p class="text-red-500 text-xs text-right">
					{formErrors.hosi[0]}
				</p>
			{/if}
		</div>

		<div class="text-5xl grid grid-cols-5 text-gray-300 relative">
			{#each selectHosi as h}
				{@const displayHosi = formdata.hosi ?? 0}
				{@const active = displayHosi >= h}
				<button
					type="button"
					class="text-5xl focus:outline-none bg-transparent border-none
			active:scale-110 transition-transform"
					class:text-yellow-400={active}
					onclick={() => {
						formdata.hosi = h;
						clearError("hosi");
					}}
				>
					{active ? "★" : "☆"}
				</button>
			{/each}
			<input
				type="number"
				name="hosi"
				bind:value={formdata.hosi}
				class="absolute left-1/2 w-1 opacity-0 pointer-events-none"
			/>
		</div>

		<button
			class="active:scale-150 transition-transform
		bg-blue-500 p-5 rounded-xl text-white font-bold"
			type="submit">回答</button
		>
	</div>
</form>
