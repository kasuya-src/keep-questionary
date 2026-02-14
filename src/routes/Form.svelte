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

    const selectAge = ["10代未満", "10代", "20代", "30代", "40代", "50代", "60代以上"];
    const selectGender = ["男性", "女性", "その他"];
    const selectHosi = [1, 2, 3, 4, 5];
    const selectArea = ["北海道", "東北", "北関東", "南関東", "東海", "北陸", "近畿", "中国", "四国", "九州", "沖縄", "海外"];
    const selectMeate = ["限定品", "アウトレット", "新製品", "トークショー", "プロアングラー", "友達に会う", "飲食ブース", "ロッド", "リール", "なし"];
    const selectHistory = ["1年未満", "1年〜3年", "3年〜5年", "5年以上"];
    const selectAng = ["バス", "シーバス", "イカ", "マダイ", "マグロ", "ソルト", "エリア", "ネイティブ", "その他"];

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
        const firstKey = Object.keys(errors)[0] as keyof FormErrors;
        if (!firstKey) return;
        const el = document.querySelector(`[data-field="${firstKey}"]`) as HTMLElement | null;
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
</script>

<form onsubmit={handleSubmit} class="bg-slate-50 min-h-screen p-3 font-sans text-slate-800">
    <div class="max-w-md mx-auto space-y-4">
        <div class="text-center py-2">
            <h1 class="text-xl font-black text-blue-600 tracking-tighter italic">KEEPCAST 2026</h1>
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Questionnaire</p>
        </div>

        <div class="bg-white rounded-3xl shadow-sm border border-slate-200 p-5 space-y-6">
            
            <div class="grid grid-cols-2 gap-3">
                <div data-field="age" class="space-y-1">
                    <span class="text-[11px] font-bold text-slate-400 ml-1">年代</span>
                    <select bind:value={formdata.age} onchange={() => clearError("age")} class="w-full bg-slate-50 border-none p-3 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                        <option value="" disabled selected>選択</option>
                        {#each selectAge as opt}<option value={opt}>{opt}</option>{/each}
                    </select>
                    {#if formErrors.age}<p class="text-red-500 text-[9px] font-bold mt-1 ml-1 leading-none">{formErrors.age[0]}</p>{/if}
                </div>
                <div data-field="gender" class="space-y-1">
                    <span class="text-[11px] font-bold text-slate-400 ml-1">性別</span>
                    <select bind:value={formdata.gender} onchange={() => clearError("gender")} class="w-full bg-slate-50 border-none p-3 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                        <option value="" disabled selected>選択</option>
                        {#each selectGender as opt}<option value={opt}>{opt}</option>{/each}
                    </select>
                    {#if formErrors.gender}<p class="text-red-500 text-[9px] font-bold mt-1 ml-1 leading-none">{formErrors.gender[0]}</p>{/if}
                </div>
                <div data-field="area" class="space-y-1">
                    <span class="text-[11px] font-bold text-slate-400 ml-1">地域</span>
                    <select bind:value={formdata.area} onchange={() => clearError("area")} class="w-full bg-slate-50 border-none p-3 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                        <option value="" disabled selected>選択</option>
                        {#each selectArea as opt}<option value={opt}>{opt}</option>{/each}
                    </select>
                    {#if formErrors.area}<p class="text-red-500 text-[9px] font-bold mt-1 ml-1 leading-none">{formErrors.area[0]}</p>{/if}
                </div>
                <div data-field="history" class="space-y-1">
                    <span class="text-[11px] font-bold text-slate-400 ml-1">釣歴</span>
                    <select bind:value={formdata.history} onchange={() => clearError("history")} class="w-full bg-slate-50 border-none p-3 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                        <option value="" disabled selected>選択</option>
                        {#each selectHistory as opt}<option value={opt}>{opt}</option>{/each}
                    </select>
                    {#if formErrors.history}<p class="text-red-500 text-[9px] font-bold mt-1 ml-1 leading-none">{formErrors.history[0]}</p>{/if}
                </div>
            </div>

            <div data-field="meate" class="space-y-3">
                <div class="flex items-center gap-2 text-[11px] font-bold text-slate-400 ml-1">
                    <span>お目当て</span><span class="text-[9px] text-blue-500 border border-blue-200 px-1.5 rounded-full uppercase">Multiple</span>
                </div>
                <div class="flex flex-wrap gap-1.5">
                    {#each selectMeate as elm}
                        <label class="flex items-center justify-center px-3 py-2 rounded-full border text-center transition-all cursor-pointer {formdata.meate.includes(elm) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-500'}">
                            <input type="checkbox" value={elm} bind:group={formdata.meate} onchange={() => clearError("meate")} class="sr-only" />
                            <span class="text-[10px] font-bold whitespace-nowrap">{elm}</span>
                        </label>
                    {/each}
                </div>
                {#if formErrors.meate}<p class="text-red-500 text-[9px] font-bold mt-1 ml-1 italic text-right">{formErrors.meate[0]}</p>{/if}
            </div>

            {#each [{label: '今やっている釣り', field: 'nowang', data: 'nowang'}, {label: 'やってみたい釣り', field: 'futureang', data: 'futureang'}] as section}
                <div data-field={section.field} class="space-y-3">
                    <span class="text-[11px] font-bold text-slate-400 ml-1">{section.label}</span>
                    <div class="flex flex-wrap gap-1.5">
                        {#each selectAng as elm}
                            <label class="flex items-center justify-center px-3 py-2 rounded-full border text-center transition-all cursor-pointer {formdata[section.data as 'nowang' | 'futureang'].includes(elm) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-500'}">
                                <input type="checkbox" value={elm} bind:group={formdata[section.data as 'nowang' | 'futureang']} onchange={() => clearError(section.field as keyof FormErrors)} class="sr-only" />
                                <span class="text-[10px] font-bold whitespace-nowrap">{elm}</span>
                            </label>
                        {/each}
                    </div>
                </div>
            {/each}

            <div class="bg-blue-50/50 rounded-3xl p-4 text-center space-y-2" data-field="hosi">
                <span class="text-xs font-bold text-slate-500 uppercase tracking-tighter">Satisfaction</span>
                <div class="flex justify-center gap-1">
                    {#each selectHosi as h}
                        <button type="button" class="text-4xl transition-all active:scale-150 {(formdata.hosi ?? 0) >= h ? 'text-yellow-400' : 'text-slate-200'}" onclick={() => { formdata.hosi = h; clearError("hosi"); }}>★</button>
                    {/each}
                </div>
                {#if formErrors.hosi}<p class="text-red-500 text-[9px] font-bold italic">{formErrors.hosi[0]}</p>{/if}
            </div>

            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 text-sm uppercase tracking-widest" type="submit">
                Submit Response
            </button>
        </div>
    </div>
</form>