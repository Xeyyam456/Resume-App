# Resume Builder — Kod İzahı

Bu sənəd layihədəki bütün JSX fayllarını — hansı faylın nə etdiyini, hər funksiyanın, hər sətrin niyə yazıldığını — heç bir proqramlaşdırma biliyi olmayan birinin də başa düşəcəyi səviyyədə izah edir.

---

## Mündəricat

1. [Layihə nədir?](#layihə-nədir)
2. [Fayl strukturu](#fayl-strukturu)
3. [App.jsx](#appjsx)
4. [UI Komponentlər](#ui-komponentlər)
   - [Button.jsx](#buttonjsx)
   - [FormInput.jsx](#forminputjsx)
   - [FormTextarea.jsx](#formtextareajsx)
   - [FormSelect.jsx](#formselectjsx)
   - [SectionCard.jsx](#sectioncardjsx)
   - [EntryCard.jsx](#entrycardjsx)
5. [Form Komponentlər](#form-komponentlər)
   - [ResumeForm.jsx](#resumeformjsx)
   - [PersonalInfoSection.jsx](#personalinfosectionjsx)
   - [SummarySection.jsx](#summarysectionjsx)
   - [ExperienceSection.jsx](#experiencesectionjsx)
   - [EducationSection.jsx](#educationsectionjsx)
   - [SkillsSection.jsx](#skillssectionjsx)
   - [ProjectsSection.jsx](#projectssectionjsx)
6. [Preview Komponentlər](#preview-komponentlər)
   - [ResumePreview.jsx](#resumepreviewjsx)
   - [CVMain.jsx](#cvmainjsx)
   - [CVSidebar.jsx](#cvsidebarjsx)
7. [validation.js](#validationjs)

---

## Layihə nədir?

Bu, brauzerdə işləyən CV hazırlama alətidir. Sol tərəfdə forma var — istifadəçi adını, iş təcrübəsini, bacarıqlarını daxil edir. Sağ tərəfdə isə daxil edilən məlumatlar anında gözəl dizaynlı CV-yə çevrilir. Hazır olduqda "Download / Print PDF" düyməsinə basıb çap etmək olur.

---

## Fayl strukturu

```
src/
├── App.jsx                        ← Bütün tətbiqin mərkəzi. Bütün məlumatlar burada saxlanılır.
├── utils/
│   └── validation.js              ← Input-ların doğruluğunu yoxlayan qaydalar.
└── components/
    ├── ui/                        ← Hər yerdə istifadə edilən kiçik "tikinti blokları"
    │   ├── Button/Button.jsx
    │   ├── FormInput/FormInput.jsx
    │   ├── FormTextarea/FormTextarea.jsx
    │   ├── FormSelect/FormSelect.jsx
    │   ├── SectionCard/SectionCard.jsx
    │   └── EntryCard/EntryCard.jsx
    ├── form/                      ← Formun bölmələri (sol panel)
    │   ├── ResumeForm/ResumeForm.jsx
    │   ├── PersonalInfoSection/PersonalInfoSection.jsx
    │   ├── SummarySection/SummarySection.jsx
    │   ├── ExperienceSection/ExperienceSection.jsx
    │   ├── EducationSection/EducationSection.jsx
    │   ├── SkillsSection/SkillsSection.jsx
    │   └── ProjectsSection/ProjectsSection.jsx
    └── preview/                   ← CV-nin görüntüsü (sağ panel)
        ├── ResumePreview/ResumePreview.jsx
        ├── CVMain/CVMain.jsx
        └── CVSidebar/CVSidebar.jsx
```

**Niyə belə qruplaşdırılıb?**

`ui/` qovluğundakı komponentlər — Button, FormInput kimi — heç bir işə bağlı deyil. Onlar sadəcə görünüş və davranış bloklarıdır, istənilən yerdə istifadə oluna bilər.

`form/` qovluğunda yalnız formu doldurmaqla əlaqədar komponentlər var. `preview/` qovluğunda yalnız CV-nin çap görünüşü ilə əlaqədar komponentlər var. Bu iki hissəni qarışdırmamaq üçün ayrı saxlanılıb.

---

## App.jsx

Bu fayldır ki, bütün tətbiq onun üzərindədir. Bir bina düşünün — `App.jsx` o binanın özüdür, bütün digər komponentlər isə o binanın otaqlarıdır.

### İdxallar (imports)

```jsx
import { useState } from 'react'
```

React-ın içindən bir alət götürülür:

- **`useState`** — Komponentin yaddaşıdır. Normal JavaScript dəyişəni (`let x = 5`) React-da işləmir, çünki dəyər dəyişdikdə ekran yenilənmir. `useState` isə həm dəyəri saxlayır, həm dəyişdikdə ekranı avtomatik yeniləyir.

```jsx
import ResumeForm from '@/components/form/ResumeForm'
import ResumePreview from '@/components/preview/ResumePreview'
import Button from '@/components/ui/Button'
```

---

### `crypto.randomUUID()` — Unikal ID yaratmaq

Heç bir npm paketi lazım deyil — brauzerə qurulu gəlir.

`crypto.randomUUID()` hər çağırıldıqda tamamilə fərqli unikal bir sətir qaytarır. Məsələn: `"110e8400-e29b-41d4-a716-446655440000"`.

**Niyə lazımdır?** Hər experience, education, skill, project əlavə edildikdə onların unikal "adı" (id) olmalıdır. React siyahılardakı elementləri bir-birindən ayırt etmək üçün bu id-dən istifadə edir. Əgər iki elementin id-si eyni olsaydı, biri silinəndə React hansını siləcəyini bilməzdi.

---

### `initialResumeData` obyekti

```jsx
const initialResumeData = {
  personal: {
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    photo: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
}
```

Bu, tətbiq açıldığında CV-nin başlanğıc vəziyyətidir — hər şey boş.

Niyə `''` (boş sətir) istifadə edilib `null` əvəzinə? React-da inputları "controlled" (idarə olunan) etmək üçün onların dəyəri mütləq string olmalıdır. `null` göndərilsəydi, React xəta verərdi: *"Uncontrolled component"*.

`experience: []`, `education: []` və s. — Boş massiv `[]` istifadə edilib çünki bunlar sonradan dinamik olaraq böyüyəcək siyahılardır. Başlanğıcda sıfır element var.

Bu obyekt `App` funksiyasının **xaricindədir**. Niyə? Çünki o heç vaxt dəyişmir, sadəcə başlanğıc dəyərdir. `App` içinə qoyulsaydı, hər render-də yenidən yaranardı — bu isə lazımsızdır.

---

### State-lər

```jsx
const [resumeData, setResumeData] = useState(initialResumeData)
```

Bu bir cüt şey yaradır:
- `resumeData` — CV-nin bütün məlumatları. İstədiyiniz zaman oxuya bilərsiniz.
- `setResumeData` — `resumeData`-nı dəyişdirmək üçün tək yol. Birbaşa `resumeData.personal.firstName = 'John'` yazmaq React-da **işləmir** — bunun əvəzinə `setResumeData(...)` çağırmaq lazımdır.

```jsx
const [activeTab, setActiveTab] = useState('form')
```

Mobil ekranda eyni anda həm forma, həm preview göstərmək çətin olduğundan bir tab sistemi var. `activeTab` ya `'form'` ya da `'preview'` dəyərini saxlayır. Başlanğıcda `'form'`-dur — çünki istifadəçi tətbiqi açanda əvvəlcə doldurmaq istəyir.

---

### `updatePersonal` funksiyası

```jsx
const updatePersonal = (field, value) => {
  setResumeData(prev => ({
    ...prev,
    personal: { ...prev.personal, [field]: value },
  }))
}
```

İstifadəçi adını dəyişdirəndə bu funksiya çağırılır. İki parametr alır:
- `field` — hansı sahə dəyişdi (`'firstName'`, `'email'` və s.)
- `value` — yeni dəyər (`'John'`, `'john@gmail.com'` və s.)

Daxilindəki izah:

`setResumeData(prev => ...)` — `prev` köhnə state-dir. React-a deyirik: "Köhnə dəyərə bax, bunun əsasında yeni dəyər yarat."

`...prev` — Spread operatoru. `resumeData`-nın bütün sahələrini (`summary`, `experience`, `skills` və s.) kopyalayır. Bunu etməsəydik, yalnız `personal` qalardı, digərləri itərdi.

`personal: { ...prev.personal, [field]: value }` — Köhnə `personal` obyektinin bütün sahələrini kopyalayır, yalnız dəyişən birini əvəz edir.

`[field]` — JavaScript-də `[dəyişən]` şəklindəki açarlar computed property adlanır. `field = 'email'` olduqda `[field]: value` ifadəsi `email: value` kimi işləyir.

**Məsələn:** İstifadəçi Email-ə `john@gmail.com` yazanda:
```
updatePersonal('email', 'john@gmail.com')
```
çağırılır. Nəticədə `personal.email` yalnız o dəyərə yenilənir, `firstName`, `phone` və s. dəyişmir.

---

### `updateSummary` funksiyası

```jsx
const updateSummary = (value) => {
  setResumeData(prev => ({ ...prev, summary: value }))
}
```

`summary` personal kimi iç-içə obyekt deyil, birbaşa bir sətirdir. Buna görə `...prev.personal` kimi daxili kopyalama lazım deyil — `summary: value` ilə birbaşa yeniləmək kifayətdir.

---

### `addExperience` funksiyası

```jsx
const addExperience = () => {
  setResumeData(prev => ({
    ...prev,
    experience: [
      ...prev.experience,
      { id: crypto.randomUUID(), company: '', position: '', startDate: '', endDate: '', current: false, description: '' },
    ],
  }))
}
```

"Add Experience" düyməsinə basıldıqda bu çağırılır. Köhnə experience siyahısını kopyalayır (`...prev.experience`), sonuna tamamilə boş yeni bir iş təcrübəsi əlavə edir. `current: false` — "Burada hələ işləyirəm" checkbox-u başlanğıcda işarələnməyib.

---

### `updateExperience` funksiyası

```jsx
const updateExperience = (id, field, value) => {
  setResumeData(prev => ({
    ...prev,
    experience: prev.experience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ),
  }))
}
```

İstifadəçi hər hansı bir experience-in hər hansı bir sahəsini dəyişdirəndə bu çağırılır. Üç parametr alır:
- `id` — Hansı experience dəyişir.
- `field` — Həmin experience-in hansı sahəsi dəyişir (`'position'`, `'company'` və s.)
- `value` — Yeni dəyər.

`.map(exp => ...)` — Experience siyahısının hər elementinin üzərindən keçir.

`exp.id === id ? ... : exp` — Ternary operator. "Əgər bu element dəyişdirilməli olandırsa, yenilə; yoxsa olduğu kimi saxla" mənasındadır.

`{ ...exp, [field]: value }` — Həmin experience-in bütün sahələrini kopyalayır, yalnız dəyişəni əvəz edir.

---

### `removeExperience` funksiyası

```jsx
const removeExperience = (id) => {
  setResumeData(prev => ({
    ...prev,
    experience: prev.experience.filter(exp => exp.id !== id)
  }))
}
```

`✕` düyməsinə basıldıqda bu çağırılır. `.filter(exp => exp.id !== id)` — "id-si göndərilən ilə eyni olmayan bütün elementləri saxla" mənasındadır. Nəticədə silinəcək element siyahıdan çıxır.

---

### Education, Skills, Projects funksiyaları

Bu üç bölmə üçün `add`, `update`, `remove` funksiyaları var. Onlar Experience funksiyaları ilə eyni məntiqlə işləyir, yalnız fərq odur ki, `experience` əvəzinə `education`, `skills` və ya `projects` sahəsinə müraciət edirlər.

---

### `handlers` obyekti

```jsx
const handlers = {
  updatePersonal,
  updateSummary,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addSkill,
  updateSkill,
  removeSkill,
  addProject,
  updateProject,
  removeProject,
}
```

14 funksiyanı ayrı-ayrı prop kimi göndərmək yerinə, hamısını bir `handlers` obyektinə yığırıq. `ResumeForm`-a yalnız `handlers={handlers}` göndərmək kifayət edir. `ResumeForm` isə bu funksiyaları öz alt-komponentlərinə paylaşdırır.

---

### JSX — Ekranda görünən hissə

```jsx
return (
  <div className="app">
    <header className="app-header">
      ...
    </header>
    <main className="app-main">
      <div className={`app-panel app-panel--form ${activeTab === 'form' ? 'app-panel--active' : ''}`}>
        <ResumeForm resumeData={resumeData} handlers={handlers} />
      </div>
      <div className={`app-panel app-panel--preview ${activeTab === 'preview' ? 'app-panel--active' : ''}`}>
        <ResumePreview resumeData={resumeData} />
      </div>
    </main>
  </div>
)
```

`activeTab === 'form' ? 'app-panel--active' : ''` — Bu, mobil ekran üçündür. Desktop-da hər iki panel yan-yana görünür. Mobil ekranda yalnız aktiv olan panel göstərilir. `activeTab` `'form'`-dursa, `app-panel--active` CSS class-ı form panelinə əlavə edilir — bu class onu görünən edir. Preview paneli isə gizlənir.

`<ResumeForm resumeData={resumeData} handlers={handlers} />` — Forma bütün CV məlumatlarını (`resumeData`) oxumaq üçün, `handlers`-i isə məlumatları dəyişdirmək üçün alır.

`<ResumePreview resumeData={resumeData} />` — Preview yalnız oxumaq üçün məlumatlar alır — o heç nəyi dəyişdirmir, yalnız göstərir.

---

## UI Komponentlər

Bunlar layihənin "tikinti blokları"dır. Özləri heç bir CV məlumatını bilmirlər — sadəcə görünüş və sadə davranış təmin edirlər.

---

## Button.jsx

Bütün düymələr üçün tək komponent. "Add Experience", "Remove", "Download PDF" — hamısı bu komponentdən istifadə edir, yalnız prop-ları fərqlənir.

```jsx
function Button({
  children,
  onClick,
  type,
  variant,
  size,
  fullWidth,
  active,
  disabled,
  ariaLabel,
}) {
```

**Prop-ların izahı:**

- `children` — Düymənin içindəki məzmun. `<Button>Klik et</Button>` yazanda `"Klik et"` hissəsi `children`-dir. Emoji də ola bilər, başqa komponent də.

- `onClick` — Düyməyə basıldıqda çağırılacaq funksiya. `<Button onClick={handleSave}>` kimi istifadə edilir.

- `type` — HTML düymələrinin 3 növü var: `'button'` (sadə düymə), `'submit'` (formu göndər), `'reset'` (formu sıfırla). Default `'button'`-dur. Bu vacibdir — əgər `type` verilməsəydi, form içindəki hər düymə formu submit edərdi.

- `variant` — Düymənin vizual növü:
  - `'primary'` — İndigo fonda ağ mətn. Əsas əməliyyat düymələri üçün.
  - `'dashed'` — Nöqtəli kənarlı, şəffaf fon. "Yeni əlavə et" düymələri üçün.
  - `'ghost'` — Tamamilə şəffaf, yalnız hover-da görünür. Tab düymələri üçün.
  - `'danger'` — Qırmızı. Silmə düymələri üçün.

- `size` — `'sm'` (kiçik), `'md'` (orta), `'lg'` (böyük).

- `fullWidth` — `true` olarsa düymə bütün eni tutur. "Add Experience" düymələri belədir.

- `active` — Yalnız `ghost` variant üçün. Tab aktiv olduqda fərqli görünüş üçün. `activeTab === 'form'` olduqda Edit tab-ına `active={true}` göndərilir.

- `disabled` — `true` olarsa düymə klikə cavab vermir və solğun görünür.

- `ariaLabel` — Accessibility üçün. Yalnız `✕` kimi bir ikon olan düymələrdə ekran oxuyucuları (vision-impaired istifadəçilər üçün) düymənin nə etdiyini bilmir. `ariaLabel="Remove entry"` göndərildikdə ekran oxuyucusu "Remove entry" deyir.

```jsx
const classes = [
  styles.btn,
  styles[variant],
  styles[size],
  fullWidth ? styles.full : '',
  variant === 'ghost' && active ? styles.ghostActive : '',
]
  .filter(Boolean)
  .join(' ')
```

Bu hissə düymənin CSS class-larını dinamik olaraq yığır:

1. `styles.btn` — Həmişə tətbiq olunan əsas class.
2. `styles[variant]` — `variant = 'primary'` olduqda `styles.primary` class-ını verir. JavaScript-də obyektə dəyişənlə müraciət etmək üçün `[dəyişən]` sintaksisi istifadə edilir.
3. `styles[size]` — `size = 'sm'` olduqda `styles.sm`.
4. `fullWidth ? styles.full : ''` — `fullWidth` `true`-dursa `styles.full` əlavə edilir, yoxdursa boş sətir.
5. `variant === 'ghost' && active ? styles.ghostActive : ''` — Yalnız həm ghost variant, həm də active olduqda xüsusi class.

`.filter(Boolean)` — Array içindəki boş sətirləri (`''`) silir. `Boolean('')` = `false`, buna görə boş sətir filter-dən keçmir.

`.join(' ')` — Array elementlərini boşluqla birləşdirib tək sətir yaradır: `"btn primary sm"`.

---

## FormInput.jsx

Bütün text input-lar üçün tək komponent. Ad, email, telefon, şəhər — hamısı bu komponentdir.

```jsx
function FormInput({ label, id, type, value, onChange, placeholder, required, validate }) {
  const [touched, setTouched] = useState(false)
```

`touched` — istifadəçi bu input-a toxunub-toxunmadığını bildirir. Başlanğıcda `false`. İstifadəçi input-dan çıxanda (blur) `true` olur.

**Niyə `touched` lazımdır?** Tətbiq açılandan dərhal xəta mesajları göstərmək yaxşı UX deyil. İstifadəçi hələ ora gəlib çatmayıb. Yalnız o input-a toxunandan sonra yoxlama aktivləşsin istəyirik.

```jsx
const errorMsg = touched && validate.length > 0
  ? runValidate(value, validate)
  : null
```

`touched && validate.length > 0` — İki şərt eyni anda doğru olmalıdır:
1. İstifadəçi bu input-a toxunmuş olmalıdır (`touched = true`).
2. Bu input üçün ən azı bir yoxlama qaydası verilmiş olmalıdır (`validate.length > 0`).

Əgər ikisi doğrudursa, `runValidate(value, validate)` çağırılır — `validation.js`-dən gəlir, xəta mesajını qaytarır (yoxsa `null`). Əgər şərtlərdən biri yanlışdırsa, `errorMsg = null` — heç bir xəta göstərilmir.

```jsx
<input
  className={`${styles.input} ${errorMsg ? styles.inputError : ''}`}
  id={id}
  type={type}
  value={value}
  onChange={e => onChange(e.target.value)}
  onBlur={() => setTouched(true)}
  placeholder={placeholder}
  required={required}
/>
```

`onChange={e => onChange(e.target.value)}` — React-ın `onChange` event handler-ı `e` adlı event obyekti verir. `e.target` — dəyişən elementin özüdür. `e.target.value` — həmin elementin cari dəyəri (istifadəçinin yazdığı mətn). Biz yalnız bu dəyəri götürüb `onChange` prop-una göndəririk.

`onBlur={() => setTouched(true)}` — Blur hadisəsi — istifadəçi input-dan çıxanda (başqa yerə klikləndə) baş verir. Bu anda `touched = true` edilir, bununla da yoxlama aktivləşir.

`{errorMsg && <span className={styles.errorMsg}>{errorMsg}</span>}` — `errorMsg` `null`-dırsa heç nə göstərilmir. Dolu sətirdirsə xəta mesajı göstərilir.

---

## FormTextarea.jsx

`FormInput` ilə demək olar ki, eynidir. Yeganə fərqlər:

- `<input>` yerinə `<textarea>` istifadə edilir. Textarea çox sətirli mətn daxil etməyə imkan verir (Professional Summary, iş təsviri kimi sahələr üçün).
- `rows` prop-u əlavə edilib — textarea-nın başlanğıc hündürlüyünü (neçə sətir) bildirir. Default `4`.
- Validation (yoxlama) sistemi yoxdur — Summary sahəsi üçün format yoxlaması gərəkli görülməyib.

---

## FormSelect.jsx

Açılan siyahı (dropdown) üçün komponent. Dərəcə seçimi (Bachelor's, Master's...) və bacarıq səviyyəsi (Beginner, Expert...) üçün istifadə edilir.

```jsx
function FormSelect({ label, id, value, onChange, options, required }) {
```

`options` prop-u belə görünən array alır:
```js
[
  { value: 'Beginner', label: '🔵 Beginner' },
  { value: 'Expert',   label: '🔴 Expert'   },
]
```
- `value` — state-də saxlanılan dəyər (məsələn, `'Expert'`).
- `label` — istifadəçiyə göstərilən mətn (məsələn, `'🔴 Expert'`).

```jsx
{options.map(opt => (
  <option key={opt.value} value={opt.value}>
    {opt.label}
  </option>
))}
```

`options.map(...)` — Array-in hər elementini HTML `<option>` elementinə çevirir. `key={opt.value}` — React-ın siyahı elementlərini tanıması üçün unikal açar lazımdır.

`value={value}` — `<select>` elementinin seçili variantı state-dən idarə edilir. Bu controlled component nümunəsidir — state dəyişdikdə select avtomatik yenilənir.

---

## SectionCard.jsx

Formun hər bölməsini (Personal Info, Summary, Experience...) eyni görünüşlü çərçivəyə sarar.

```jsx
function SectionCard({ icon, title, children }) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}
```

`{icon && <span>...}` — `icon` prop-u verilmişsə emoji göstərilir, verilməmişsə heç nə göstərilmir. `&&` operatoru: sol tərəf doğrudursa sağ tərəfi render edir.

`{children}` — Bu komponentə qoyulan hər şey buraya gəlir. Məsələn:
```jsx
<SectionCard title="Skills">
  <FormInput label="Skill" ... />   ← bu `children`-dir
</SectionCard>
```

`<section>` teqi — Semantic (mənalı) HTML. `<div>` yerinə `<section>` istifadə etmək ekran oxuyucularına bu hissənin müstəqil bir bölmə olduğunu bildirir.

---

## EntryCard.jsx

Hər experience, education, skill, project bir `EntryCard`-da göstərilir. Karta başlıqdan klikləyib açıb-bağlamaq olur.

```jsx
function EntryCard({ title, onRemove, children, defaultOpen }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
```

`isOpen` — Kartın açıq (`true`) ya bağlı (`false`) olduğunu bildirir. `defaultOpen` prop-u ilə başlanğıc vəziyyəti təyin edilir — default `true`-dur, yəni yeni əlavə edilən kart açıq gəlir.

```jsx
<button
  type="button"
  className={styles.toggle}
  onClick={() => setIsOpen(prev => !prev)}
>
```

`onClick={() => setIsOpen(prev => !prev)}` — Klikdə `isOpen`-i ters çevirir: açıqsa bağlayır, bağlıysa açır. `prev => !prev` — cari state-in əksini alır (`true` → `false`, `false` → `true`).

```jsx
<span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>▶</span>
```

`isOpen` `true`-dursa `arrowOpen` CSS class-ı əlavə edilir — bu class CSS-də oku 90 dərəcə döndürür (`▶` → `▼` kimi görünür). Bağlıysa ox öz yerindədir (`▶`).

```jsx
{isOpen && <div className={styles.body}>{children}</div>}
```

`isOpen` `false`-dursa bu `<div>` DOM-a əlavə **edilmir** (sadəcə gizlənmir, tamamilə silinir). Bu performans baxımından yaxşıdır — bağlı kartın içindəki onlarca input render edilmir.

`onRemove` — `✕` düyməsinə basılanda çağırılır. `EntryCard` özü silmir, üst komponentdən gəlir. Bu düzgün arxitekturadır: komponent öz silinməsini idarə etməməlidir.

---

## Form Komponentlər

---

## ResumeForm.jsx

Formun bütün bölmələrini bir araya toplayır. Özü heç bir state saxlamır — yalnız məlumatları `App.jsx`-dən alıb doğru alt-komponentlərə ötürür.

```jsx
function ResumeForm({ resumeData, handlers }) {
  const { personal, summary, experience, education, skills, projects } = resumeData
  const {
    updatePersonal,
    updateSummary,
    addExperience,
    updateExperience,
    removeExperience,
    ...
  } = handlers
```

**Destructuring** — `resumeData.personal` yazmaq əvəzinə `personal` adı ilə birbaşa istifadə etmək üçün. Kod daha oxunaqlı olur.

```jsx
return (
  <form className={styles.panel} onSubmit={e => e.preventDefault()}>
```

`onSubmit={e => e.preventDefault()}` — Brauzer formları submit etdikdə default davranışı səhifəni yeniləmək (server-ə göndərmək)dir. Biz bunu istəmirik — CV ani olaraq güncəllənir, heç bir server yoxdur. `e.preventDefault()` bu default davranışı ləğv edir.

```jsx
<PersonalInfoSection personal={personal} onUpdate={updatePersonal} />
<SummarySection summary={summary} onUpdate={updateSummary} />
<ExperienceSection
  experiences={experience}
  onAdd={addExperience}
  onUpdate={updateExperience}
  onRemove={removeExperience}
/>
```

Hər bölməyə yalnız özünə lazım olan məlumatlar göndərilir. `ExperienceSection` education haqqında heç nə bilmir — bu qəsdən belədir. Komponentlər yalnız özünə aid məlumatlarla işləyir.

---

## PersonalInfoSection.jsx

Ad, soyad, email, telefon, şəhər, website, LinkedIn və foto sahələrini ehtiva edir.

```jsx
const handlePhotoChange = e => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = ev => onUpdate('photo', ev.target.result)
  reader.readAsDataURL(file)
}
```

İstifadəçi fotoşəkil seçəndə bu funksiya çağırılır:

1. `e.target.files[0]` — Seçilən faylların siyahısından birincisini götürür (yalnız bir fayl seçmək mümkündür).
2. `if (!file) return` — Əgər heç fayl seçilməmişsə (istifadəçi ləğv etdisə), funksiyadan çıx.
3. `new FileReader()` — Brauzer API-si. Faylları JavaScript-də oxumağa imkan verir.
4. `reader.readAsDataURL(file)` — Faylı oxumağa başla, bitdikdə base64 formatına çevir.
5. `reader.onload = ev => onUpdate('photo', ev.target.result)` — Oxuma bitdikdə `ev.target.result` uzun bir sətir qaytarır: `"data:image/jpeg;base64,/9j/4AAQSk..."`. Bu sətir birbaşa `<img src="">` içinə qoyula bilər.

```jsx
const initials =
  `${personal.firstName?.[0] ?? ''}${personal.lastName?.[0] ?? ''}`.toUpperCase() || '?'
```

Foto olmadıqda avatarda baş hərflər göstərilir:

- `personal.firstName?.[0]` — Optional chaining (`?.`). `firstName` boşdursa crash etmir, `undefined` qaytarır.
- `?? ''` — Nullish coalescing. `undefined` gəlsə boş sətirə çevirir.
- `.toUpperCase()` — Böyük hərfə çevirir.
- `|| '?'` — Nəticə `''` (boş) olduqda `'?'` göstərilir.

```jsx
<FormInput
  label="First Name"
  id="firstName"
  value={personal.firstName}
  onChange={val => onUpdate('firstName', val)}
  placeholder="John"
  required
  validate={['required', 'name']}
/>
```

`validate={['required', 'name']}` — Bu input üçün iki yoxlama qaydası var: boş olmamalı (`required`) və yalnız hərf içərməlidir (`name` — rəqəm, xüsusi simvol qəbul edilmir).

`required` — JSX-də prop adını dəyər vermədən yazmaq `required={true}` ilə eynidir.

---

## SummarySection.jsx

Ən sadə bölmə komponentlərindən biridir.

```jsx
function SummarySection({ summary, onUpdate }) {
  return (
    <SectionCard icon="📝" title="Professional Summary">
      <FormTextarea
        label="Write a compelling summary about yourself"
        id="summary"
        value={summary}
        onChange={onUpdate}
        ...
      />
    </SectionCard>
  )
}
```

`onChange={onUpdate}` — Adətən `onChange={val => onUpdate(val)}` yazılır. Burada isə birbaşa `onUpdate` yazılıb. Bu işləyir, çünki `FormTextarea`-nın `onChange` prop-u artıq hazır dəyəri (`val`) göndərir. `App.jsx`-dəki `updateSummary` funksiyası da tam olaraq bir string parametr gözləyir. Beləliklə ikisi birbaşa uyuşur.

---

## ExperienceSection.jsx

İş təcrübələrinin siyahısını göstərir. Hər biri aça-bağlaya bilən `EntryCard`-dadır.

```jsx
function ExperienceSection({ experiences, onAdd, onUpdate, onRemove }) {
```

`experiences` — `App.jsx`-dəki `resumeData.experience` massivi. `onAdd`, `onUpdate`, `onRemove` — `App.jsx`-dən gəlir, state-i dəyişdirmək üçündür.

```jsx
{experiences.map(exp => (
  <EntryCard
    key={exp.id}
    title={
      exp.position && exp.company
        ? `${exp.position} @ ${exp.company}`
        : exp.position || exp.company || 'New Experience'
    }
    onRemove={() => onRemove(exp.id)}
  >
```

`experiences.map(exp => ...)` — Siyahıdakı hər experience üçün bir `EntryCard` render edir.

`key={exp.id}` — React-ın siyahı elementlərini fərqləndirməsi üçün mütləq lazım olan unikal açar. Olmasa, siyahıya element əlavə edilib silinəndə React hansı komponentin state-ini qoruyacağını bilmir.

**Title məntiqi — addım-addım:**
1. `exp.position && exp.company` — Hər ikisi doluysa → `"Senior Developer @ Google"`
2. `exp.position || exp.company` — Yalnız biri doluysa → dolunun özünü göstər
3. `|| 'New Experience'` — İkisi də boşdursa → `"New Experience"`

`onRemove={() => onRemove(exp.id)}` — Lambda funksiyası (`() => ...`) istifadə edilib. Niyə birbaşa `onRemove={onRemove}` yazılmayıb? Çünki `onRemove`-a hansı elementin silinəcəyini bildirən `id` göndərmək lazımdır. `() => onRemove(exp.id)` bunu edir — düyməyə basılanda avtomatik həmin experience-in `id`-sini göndərir.

```jsx
{exp.current ? (
  <div className={styles.inputDisabled}>Present</div>
) : (
  <input
    className={styles.endDateInput}
    type="month"
    ...
  />
)}
```

`exp.current` — "Hələ burada işləyirəm" checkbox-unun dəyəri. `true`-dursa "Present" yazısı göstərilir (input yoxdur). `false`-dursa ay seçmək üçün input göstərilir.

```jsx
<input
  type="checkbox"
  checked={exp.current}
  onChange={e => {
    onUpdate(exp.id, 'current', e.target.checked)
    if (e.target.checked) onUpdate(exp.id, 'endDate', '')
  }}
/>
```

`e.target.checked` — Checkbox üçün `.value` deyil, `.checked` istifadə edilir. `.value` həmişə `"on"` qaytarır, `.checked` isə boolean (`true`/`false`) qaytarır.

`if (e.target.checked) onUpdate(exp.id, 'endDate', '')` — Checkbox işarələnəndə `endDate` silinir. Çünki "hələ burada işlədiyini" deyirsənsə, bitiş tarixi olmaz.

---

## EducationSection.jsx

Təhsil məlumatlarının siyahısı. Məntiqi Experience ilə eynidir, əlavə olaraq dərəcə (degree) seçimi üçün `FormSelect` var.

```jsx
const DEGREE_OPTIONS = [
  { value: '', label: 'Select degree…' },
  { value: "Bachelor's", label: "Bachelor's" },
  { value: "Master's", label: "Master's" },
  { value: 'PhD', label: 'PhD / Doctorate' },
  { value: 'Associate', label: 'Associate' },
  { value: 'Diploma', label: 'Diploma' },
  { value: 'Certificate', label: 'Certificate' },
  { value: 'High School', label: 'High School' },
]
```

Bu sabit siyahı funksiya **xaricindədir**. Əgər funksiya içinə yazılsaydı, komponent hər render edildikdə (istifadəçi hər hərfə basanda) bu massiv yenidən yaranardı. Xaricdə olduğundan tətbiq açıldığında bir dəfə yaranır, sonra dəyişmir.

`{ value: '', label: 'Select degree…' }` — İlk seçim boş dəyərlidir. Select açıldıqda placeholder kimi görünür, hələ seçilməmiş vəziyyəti bildirir.

```jsx
title={
  edu.school
    ? edu.degree
      ? `${edu.school} — ${edu.degree}`
      : edu.school
    : 'New Education'
}
```

İç-içə ternary məntiqi:
1. `edu.school` doluysa → daxilə gir
2. Daxildə `edu.degree` də doluysa → `"MIT — Bachelor's"`
3. `edu.degree` boşdursa → yalnız `"MIT"`
4. `edu.school` özü boşdursa → `"New Education"`

---

## SkillsSection.jsx

Bacarıqların siyahısı. Hər bacarıq üçün ad və səviyyə var.

```jsx
const LEVEL_OPTIONS = [
  { value: 'Beginner',     label: '🔵 Beginner'     },
  { value: 'Elementary',   label: '🟢 Elementary'   },
  { value: 'Intermediate', label: '🟡 Intermediate' },
  { value: 'Advanced',     label: '🟠 Advanced'     },
  { value: 'Expert',       label: '🔴 Expert'       },
]
```

`value` — state-də saxlanılır, `label` — dropdown-da göstərilir. Emoji ilə vizual rəng kodu əlavə edilib — istifadəçi daha asan seçə bilsin.

```jsx
title={skill.name ? `${skill.name} — ${skill.level}` : 'New Skill'}
```

Ad doluysa `"React — Advanced"` göstərilir. Boşdursa `"New Skill"`.

---

## ProjectsSection.jsx

Layihələrin siyahısı. Experience və Education ilə eyni məntiqdə işləyir.

```jsx
title={project.name || 'New Project'}
```

Ən sadə title məntiqi — ad varsa onu göstər, yoxdursa `'New Project'`.

```jsx
<FormInput
  label="Technologies Used"
  id={`proj-tech-${project.id}`}
  value={project.technologies}
  onChange={val => onUpdate(project.id, 'technologies', val)}
  placeholder="React, Node.js, MongoDB, Docker"
/>
```

Texnologiyalar vergüllə ayrılmış tək sətir kimi saxlanılır: `"React, Node.js, MongoDB"`. CV preview-unda bu sətir vergüldən parçalanıb hər texnologiya ayrı chip kimi göstərilir (buna `CVMain.jsx`-də baxın).

---

## Preview Komponentlər

---

## ResumePreview.jsx

Sol formu tamamilə bilmir. Yalnız hazır `resumeData` alır və onu CV-yə çevirir.

```jsx
function ResumePreview({ resumeData }) {
  const { personal, summary, experience, education, skills, projects } = resumeData

  const handlePrint = () => window.print()
```

`window.print()` — Brauzer daxilinə qurulmuş çap API-si. Bu çağırıldıqda brauzer çap dialoqunu açır. `App.css`-dəki `@media print` qaydaları ilə header, form paneli gizlənir — yalnız CV görünür.

```jsx
<div className={styles.cv} id="cv-document">
  <CVSidebar personal={personal} skills={skills} education={education} />
  <CVMain
    personal={personal}
    summary={summary}
    experience={experience}
    projects={projects}
  />
</div>
```

CV iki hissədən ibarətdir:
- **CVSidebar** — Sol sütun: foto/initials, kontakt məlumatları, bacarıqlar, təhsil.
- **CVMain** — Sağ əsas hissə: ad, vəzifə, summary, iş təcrübəsi, layihələr.

Niyə `education` yalnız `CVSidebar`-a göndərilir? Çünki dizayn qərarına görə təhsil məlumatları CV-nin sol sütununda göstərilir.

---

## CVMain.jsx

CV-nin sağ əsas hissəsini render edir.

### `formatDate` funksiyası

```jsx
function formatDate(dateStr) {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[parseInt(month, 10) - 1]} ${year}`
}
```

`<input type="month">` dəyəri `'2022-03'` formatında saxlanılır. Amma CV-də `'Mar 2022'` formatında göstərmək daha gözəldir.

Addım-addım:
1. `if (!dateStr) return ''` — Boş sətir gəlsə crash etmək əvəzinə boş sətir qaytar.
2. `dateStr.split('-')` → `'2022-03'` → `['2022', '03']`.
3. `const [year, month] = ...` — Array destructuring. `year = '2022'`, `month = '03'`.
4. `parseInt(month, 10)` → `'03'` → `3` (string-dən tam ədədə çevirir, `10` onluq sistem deməkdir).
5. `- 1` → `3 - 1 = 2` — Array 0-dan başladığı üçün mart `months[2]`-dir.
6. `months[2]` → `'Mar'`.
7. Nəticə: `` `Mar 2022` ``.

### `fullName` dəyişəni

```jsx
const fullName = [personal.firstName, personal.lastName].filter(Boolean).join(' ')
```

1. `[personal.firstName, personal.lastName]` → `['John', 'Doe']` array yaradır.
2. `.filter(Boolean)` → Boş sətirləri (`''`) silir. Yalnız ad varsa `['John']` olur.
3. `.join(' ')` → `'John Doe'` (boşluqla birləşdirir).

Nəticə: İkisi doluysa `'John Doe'`, yalnız ad varsa `'John'`, ikisi boşdursa `''`.

### Şərti render

```jsx
{summary && (
  <section>
    <h2 className={styles.sectionTitle}>Profile</h2>
    <p className={styles.summaryText}>{summary}</p>
  </section>
)}
```

`summary` boş sətirdirsə (`''`), JavaScript bunu falsy (yanlış) kimi qiymətləndirir. Buna görə `summary && ...` ifadəsi heç nə render etmir. CV-də boş bölmələr görünmür.

```jsx
{experience.length > 0 && (
  <section>...</section>
)}
```

Eyni prinsip — experience massivi boşdursa "Work Experience" başlığı da göstərilmir.

```jsx
{!summary && experience.length === 0 && projects.length === 0 && (
  <div className={styles.emptyHint}>
    <p>Fill in the form on the left to build your CV ✨</p>
  </div>
)}
```

Əgər summary, experience və projects — üçü birlikdə boşdursa, istifadəçiyə xatırlatma mesajı göstərilir.

### Texnologiyaların render edilməsi

```jsx
{project.technologies.split(',').map(t => t.trim()).filter(Boolean).map((tech, i) => (
  <span key={i} className={styles.techChip}>{tech}</span>
))}
```

Addım-addım:
1. `project.technologies` → `'React, Node.js, MongoDB'`
2. `.split(',')` → `['React', ' Node.js', ' MongoDB']` — vergüldən parçalayır.
3. `.map(t => t.trim())` → `['React', 'Node.js', 'MongoDB']` — hər elementin əvvəl/sonundakı boşluqları silir.
4. `.filter(Boolean)` → Əgər istifadəçi sonda vergül qoymuşsa (`'React,'`) boş sətir yaranır — onu silir.
5. `.map((tech, i) => <span key={i}...>)` → Hər texnologiyanı ayrı badge (chip) kimi render edir.

`key={i}` — Burada `id` olmadığından massiv indeksi istifadə edilir. Bu hal üçün məqbuldur çünki texnologiyaların sırası dəyişmir.

---

## CVSidebar.jsx

CV-nin sol sütununu render edir: foto/initials, kontaktlar, bacarıqlar, təhsil.

### `LEVEL_WIDTHS` sabit obyekti

```jsx
const LEVEL_WIDTHS = {
  Beginner: 18,
  Elementary: 36,
  Intermediate: 55,
  Advanced: 75,
  Expert: 95,
}
```

Hər bacarıq səviyyəsini progress bar genişliyinə çevirir. `'Expert'` → `95%` dolu bar. Komponent xaricindədir — render-ə bağlı deyil, sabit məlumatlardır.

### `getInitials` funksiyası

```jsx
function getInitials(firstName, lastName) {
  const f = firstName ? firstName[0].toUpperCase() : ''
  const l = lastName ? lastName[0].toUpperCase() : ''
  return f + l || '?'
}
```

Foto olmadıqda avatarda göstəriləcək baş hərfləri qaytarır.

- `firstName ? firstName[0] : ''` — `firstName` doluysa birinci hərfini götür, boşdursa boş sətir.
- `.toUpperCase()` — Böyük hərfə çevir.
- `f + l || '?'` — `f + l` boş sətir olduqda (`''` + `''` = `''`) JavaScript bunu falsy sayır, `|| '?'` isə `'?'` qaytarır.

### `formatDate` funksiyası

`CVMain.jsx`-dəki ilə eynidir — `'2022-03'` → `'Mar 2022'` çevrilməsi.

### `makeHref` funksiyası

```jsx
function makeHref(value) {
  if (!value) return null
  if (value.startsWith('http://') || value.startsWith('https://')) return value
  if (value.includes('@')) return `mailto:${value}`
  return `https://${value}`
}
```

İstifadəçinin daxil etdiyi dəyəri tıklanabilir linklərə çevirir:

1. Dəyər boşdursa → `null` qaytar (link olmayacaq).
2. `http://` və ya `https://` ilə başlayırsa → olduğu kimi istifadə et.
3. `@` işarəsi varsa → email-dir, `mailto:john@gmail.com` kimi formatla.
4. Digər hallarda → sayt URL-idir, `https://linkedin.com/in/...` kimi formatla.

### `contactItems` massivi

```jsx
const contactItems = [
  { icon: '✉', value: personal.email,    href: personal.email    ? `mailto:${personal.email}` : null },
  { icon: '✆', value: personal.phone,    href: personal.phone    ? `tel:${personal.phone}`    : null },
  { icon: '◎', value: personal.location, href: null },
  { icon: '↗', value: personal.website,  href: makeHref(personal.website) },
  { icon: 'in', value: personal.linkedin, href: makeHref(personal.linkedin) },
].filter(item => item.value)
```

Bütün kontakt sahələrini icon + dəyər + link ilə birlikdə bir massivə yığır. Sonunda `.filter(item => item.value)` boş olanları silir — məsələn, telefon daxil edilməmişsə, telefon sətri CV-də görünmür.

`href: null` — Location üçün. Şəhər adını tıklamaq mənasızdır — bu yüzdən link yoxdur.

### Progress bar render

```jsx
<div
  className={styles.barFill}
  style={{ width: `${LEVEL_WIDTHS[skill.level] ?? 50}%` }}
/>
```

`LEVEL_WIDTHS[skill.level]` — Məsələn `skill.level = 'Advanced'` olduqda `LEVEL_WIDTHS['Advanced']` = `75` qaytarır.

`?? 50` — Nullish coalescing operator. Əgər `skill.level` tanınmayan bir dəyərdirsə (məsələn `undefined`), `LEVEL_WIDTHS[...]` = `undefined` olacaq. `?? 50` deyir: "undefined gəlsə default olaraq 50 götür."

`style={{ width: '75%' }}` — Inline CSS ilə bar genişliyi dinamik olaraq təyin edilir. Bu CSS class-larla edilə bilməz çünki dəyər hər bacarıq üçün fərqlidir.

### Təhsilin render edilməsi

```jsx
{education.map(edu => {
  const startDate = formatDate(edu.startDate)
  const endDate = formatDate(edu.endDate)
  const dateRange = [startDate, endDate].filter(Boolean).join(' – ')
  return (
    <div key={edu.id} className={styles.eduItem}>
      <div className={styles.eduDegree}>
        {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
      </div>
      <div className={styles.eduSchool}>{edu.school}</div>
      {dateRange && <div className={styles.eduDate}>{dateRange}</div>}
      {edu.gpa && <div className={styles.eduDate}>GPA: {edu.gpa}</div>}
    </div>
  )
})}
```

`[startDate, endDate].filter(Boolean).join(' – ')` — İkisi doluysa `'Sep 2018 – Jun 2022'`. Biri boşdursa yalnız dolunun özü göstərilir. İkisi boşdursa `dateRange = ''` olur, `{dateRange && ...}` heç nə render etmir.

`{edu.degree}{edu.field ? ` in ${edu.field}` : ''}` — Dərəcə varsa: `"Bachelor's in Computer Science"`. Field yoxdursa: yalnız `"Bachelor's"`.

`{edu.gpa && ...}` — GPA yalnız daxil edilmişsə göstərilir.

---

## validation.js

Input dəyərlərinin doğruluğunu yoxlayan qaydalar toplusu.

```js
export const RULES = {
  required: {
    test: v => v.trim().length > 0,
    message: 'This field is required',
  },
  ...
}
```

`RULES` — Hər qaydanın iki hissəsi var:
- `test` — Dəyəri alan və `true`/`false` qaytaran funksiya. `true` = dəyər düzgündür.
- `message` — Test uğursuz olduqda göstəriləcək xəta mesajı.

`v.trim().length > 0` — `v.trim()` dəyərin əvvəl/sonundakı boşluqları silir. Uzunluğu 0-dan böyükdürsə dolulur.

**Qaydalara nümunələr:**

`email` — `'john@gmail.com'` kimi formata baxır. `@` işarəsi olmalı, sonra domain, sonra `.com` kimi uzantı.

`phone` — `+994 50 123 45 67` kimi formatları qəbul edir. `+` isteğe bağlıdır, rəqəmlər, boşluqlar, tire, mötərizə qəbul edilir.

`name` — Yalnız hərf (aksentli hərflər də daxil — é, ü, ş, ə...), boşluq, tire, apostrof qəbul edilir. Rəqəm yazıla bilməz.

`jobTitle` — Rəqəm qəbul edilmir. `!/\d/` — "rəqəm yoxdursa doğrudur" mənasındadır.

`location` — Ən azı bir hərf olmalıdır. `'42e Fasan'` kənd adı kimi keçər, amma `'1234'` keçməz.

```js
export function validate(value, ruleNames = []) {
  const isEmpty = value.trim().length === 0

  for (const name of ruleNames) {
    const rule = RULES[name]
    if (!rule) continue
    if (isEmpty && name !== 'required') continue
    if (!rule.test(value)) return rule.message
  }

  return null
}
```

`validate('john123', ['required', 'name'])` kimi çağırılır:

1. `isEmpty` — Dəyər boşdursa `true`.
2. Qaydaların üzərindən ardıcıl keçir.
3. `if (isEmpty && name !== 'required') continue` — Dəyər boşdursa yalnız `required` qaydası işləyir, digərləri atlanır. Boş sahədə həm "required", həm "format" xətası göstərməmək üçün.
4. `if (!rule.test(value)) return rule.message` — Test uğursuz olduqda xəta mesajını dərhal qaytarır (ilk xəta kifayətdir).
5. Bütün qaydalar keçilsə → `null` qaytar (xəta yoxdur).

---

## PropTypes haqqında

Hər komponentdə belə bir blok var:

```jsx
Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'dashed', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
}
```

**PropTypes nədir?** TypeScript olmadan prop tiplərini yoxlamanın yoludur. Development-də (inkişaf zamanı) səhv prop göndərildikdə brauzer konsolunda xəbərdarlıq çıxır. Production-da (canlı saytda) heç bir əlavə xərc yoxdur.

- `.isRequired` — Bu prop mütləq göndərilməlidir, yoxdursa xəbərdarlıq.
- `PropTypes.oneOf([...])` — Yalnız siyahıdakı dəyərlərdən biri qəbul edilir.
- `PropTypes.arrayOf(PropTypes.shape({...}))` — Massiv, hər elementi müəyyən strukturda olmalıdır.
- `PropTypes.node` — Render edilə bilən hər şey (mətn, element, array, null).

```jsx
Button.defaultProps = {
  type: 'button',
  variant: 'primary',
  size: 'md',
  fullWidth: false,
}
```

`defaultProps` — Prop göndərilmədikdə istifadə ediləcək default dəyərlər. `<Button>Klik</Button>` yazanda `type`, `variant`, `size` avtomatik default dəyərlər alır.
# Resume Builder — Tam Kod İzahı

> Hər komponent, hər funksiya, hər sətir — nə üçün yazıldığı ilə birlikdə izah edilir.

---

## Mündəricat

1. [Layihə Strukturu](#layihə-strukturu)
2. [App.jsx — Tətbiqin Beyni](#appjsx--tətbiqin-beyni)
3. [UI Komponentlər](#ui-komponentlər)
   - [Button](#buttonjsx)
   - [FormInput](#forminputjsx)
   - [FormTextarea](#formtextareajsx)
   - [FormSelect](#formselectjsx)
   - [SectionCard](#sectioncardjsx)
   - [EntryCard](#entrycardjsx)
4. [Form Komponentlər](#form-komponentlər)
   - [ResumeForm](#resumeformjsx)
   - [PersonalInfoSection](#personalinfosectionjsx)
   - [SummarySection](#summarysectionjsx)
   - [ExperienceSection](#experiencesectionjsx)
   - [EducationSection](#educationsectionjsx)
   - [SkillsSection](#skillssectionjsx)
   - [ProjectsSection](#projectssectionjsx)
5. [Preview Komponentlər](#preview-komponentlər)
   - [ResumePreview](#resumepreviewjsx)
   - [CVMain](#cvmainjsx)
   - [CVSidebar](#cvsidebarjsx)

---

## Layihə Strukturu

```
src/
├── App.jsx                  ← Tətbiqin kök (root) komponenti, bütün state burada saxlanılır
├── components/
│   ├── form/                ← İstifadəçinin məlumat daxil etdiyi bütün form hissələri
│   ├── preview/             ← CV-nin göründüyü, çap edildiyi hissə
│   └── ui/                  ← Yenidən istifadə edilə bilən kiçik "tikinti blokları"
```

**Niyə belə qruplaşdırıldı?**
- `form/` və `preview/` ayrı saxlanılıb çünki onlar tamamilə müxtəlif məqsədlərə xidmət edir.
- `ui/` qovluğu proyektin "dizayn sistemi"dir — Button ya FormInput kimi komponentlər həm form, həm preview tərəfindən istifadə oluna bilər.

---

## App.jsx — Tətbiqin Beyni

```jsx
import { useState } from 'react'
```
- `useState` — React hook-u. Komponentin yaddaşıdır. Bir dəyər saxlayır və dəyişdikdə ekranı yenidən render edir.

```jsx
import ResumeForm from '@/components/form/ResumeForm'
import ResumePreview from '@/components/preview/ResumePreview'
import Button from '@/components/ui/Button'
```
- `@/` — `src/` qovluğunun qısa yolu. `vite.config.js`-də təyin edilib. Uzun nisbi yollar (`../../..`) yazmamaq üçündür.

---

### `crypto.randomUUID()` — Unikal ID yaratmaq

`crypto.randomUUID()` hər çağırıldıqda tamamilə fərqli 36 simvollu UUID qaytarır. Heç bir npm paketi lazım deyil — brauzərdə və Node.js-də nativ mövcuddur.

**Niyə lazımdır?**
Hər experience, education, skill, project əlavə edildikdə unikal `id` lazımdır. React `key` prop üçün, eyni zamanda hansı elementi yeniləyəcəyimizi müəyyən etmək üçün.

---

### `initialResumeData` obyekti

```jsx
const initialResumeData = {
  personal: {
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
}
```

**Niyə bu strukturdadır?**
- Bütün sahələr boş string `''` ilə başlayır — bu, React üçün vacibdir. Əgər `undefined` olsaydı, "uncontrolled input" xətası verərdi.
- `experience`, `education`, `skills`, `projects` — boş array `[]` — çünki hər biri dinamik olaraq əlavə/silinə bilər.
- Bu obyekt `App` xaricindədir — çünki heç bir render-ə bağlı deyil, sadəcə sabit başlanğıc dəyərdir.

---

### App funksiyasının içi

```jsx
function App() {
  const [resumeData, setResumeData] = useState(initialResumeData)
```
- `resumeData` — CV-nin bütün məlumatlarını saxlayan state. Tətbiqdə yeganə "həqiqət mənbəyi" (single source of truth).
- `setResumeData` — Bu state-i yeniləmək üçün funksiya.
- `useState(initialResumeData)` — Başlanğıc dəyər olaraq boş `initialResumeData` verilir.

```jsx
  const [activeTab, setActiveTab] = useState('form')
```
- Mobil görünüşdə istifadəçinin "Edit" yoxsa "Preview" tabında olduğunu bildirir.
- Başlanğıcda `'form'` — çünki istifadəçi ilk açdıqda formu doldurmalıdır.

---

### `updatePersonal` funksiyası

```jsx
const updatePersonal = (field, value) => {
  setResumeData(prev => ({
    ...prev,
    personal: { ...prev.personal, [field]: value },
  }))
}
```

**Sətir-sətir:**
- `(field, value)` — Hansı sahə dəyişdiyini (`'firstName'`) və yeni dəyəri (`'John'`) alır.
- `setResumeData(prev => ...)` — `prev` köhnə state-dir, immuatble (dəyişilməz) yeniləmə üçündür.
- `...prev` — Bütün köhnə state-i kopyalayır (`summary`, `experience` və s. itmir).
- `personal: { ...prev.personal, [field]: value }` — Köhnə personal obyektini kopyalayır, yalnız dəyişən sahəni əvəz edir. `[field]` — computed property, yəni dəyişənin adını açar kimi işlətmək.

**Misal:** `updatePersonal('email', 'john@gmail.com')` çağırılanda:
```js
personal: { firstName: '', ..., email: 'john@gmail.com', ... }
```

---

### `updateSummary` funksiyası

```jsx
const updateSummary = (value) => {
  setResumeData(prev => ({ ...prev, summary: value }))
}
```
- Personal kimi daxili obyekt yoxdur, sadəcə bir string. Buna görə `summary: value` kifayətdir.

---

### `addExperience` funksiyası

```jsx
const addExperience = () => {
  setResumeData(prev => ({
    ...prev,
    experience: [
      ...prev.experience,
      { id: crypto.randomUUID(), company: '', position: '', startDate: '', endDate: '', current: false, description: '' },
    ],
  }))
}
```

**Sətir-sətir:**
- `...prev.experience` — Köhnə experience massivini kopyalayır.
- Sonuna yeni boş obyekt əlavə edilir.
- `id: crypto.randomUUID()` — Yeni unikal ID yaradılır. Heç bir paket lazım deyil.
- `current: false` — Başlanğıcda "bu işdə hələ işləyirəm" işarəlanmamışdır.
- Bütün digər sahələr `''` — boş başlayır.

---

### `updateExperience` funksiyası

```jsx
const updateExperience = (id, field, value) => {
  setResumeData(prev => ({
    ...prev,
    experience: prev.experience.map(exp =>
      (exp.id === id ? { ...exp, [field]: value } : exp)
    ),
  }))
}
```

**Sətir-sətir:**
- `prev.experience.map(...)` — Hər experience elementinin üzərindən keçir.
- `exp.id === id` — Yalnız dəyişdirilməli olanı tapır.
- `? { ...exp, [field]: value }` — Həmin elementi kopyalayıb yalnız dəyişən sahəni əvəz edir.
- `: exp` — Qalanları olduğu kimi saxlayır.

---

### `removeExperience` funksiyası

```jsx
const removeExperience = (id) => {
  setResumeData(prev => ({
    ...prev,
    experience: prev.experience.filter(exp => exp.id !== id)
  }))
}
```
- `.filter(exp => exp.id !== id)` — Silinəcək `id`-yə sahib elementdən başqa hamısını saxlayır.

---

### Education, Skills, Projects funksiyaları

Education, Skills və Projects üçün `add`, `update`, `remove` funksiyaları tam eyni məntiqlə yazılmışdır — yalnız state-in açarı fərqlidir (`education`, `skills`, `projects`).

---

### `handlers` obyekti

```jsx
const handlers = {
  updatePersonal,
  updateSummary,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addSkill,
  updateSkill,
  removeSkill,
  addProject,
  updateProject,
  removeProject,
}
```

**Niyə ayrı obyektdə toplanıb?**
- `ResumeForm`-a 14 ayrı prop göndərmək əvəzinə, 1 `handlers` prop göndərmək daha səliqəlidir.
- `ResumeForm` bu funksiyaları alt-komponentlərə ötürür.

---

### JSX hissəsi (return)

```jsx
return (
  <div className="app">
    <header className="app-header">
      <div className="app-header__logo">
        <span className="app-header__icon">📄</span>
        <span className="app-header__title">Resume Builder</span>
      </div>
```
- BEM metodologiyası istifadə edilib: `app-header__logo` — `app-header` blokun `logo` elementi.

```jsx
      <nav className="app-header__tabs">
        <Button
          variant="ghost"
          size="sm"
          active={activeTab === 'form'}
          onClick={() => setActiveTab('form')}
        >
          ✏️ Edit
        </Button>
```
- `active={activeTab === 'form'}` — `activeTab` state-i `'form'`-dursa, `active` prop-u `true` olur. Button özü bunu görünüşə tətbiq edir.
- `onClick={() => setActiveTab('form')}` — Klikdə `activeTab` `'form'` olur, mobil görünüşdə form paneli görünür.

```jsx
      <div className={`app-panel app-panel--form ${activeTab === 'form' ? 'app-panel--active' : ''}`}>
        <ResumeForm resumeData={resumeData} handlers={handlers} />
      </div>
```
- `app-panel--active` CSS class-ı mobil ekranda paneli görünən edir.
- Desktop-da hər iki panel yan-yana görünür, mobil-da yalnız aktiv olan görünür.

---

## UI Komponentlər

---

## Button.jsx

```jsx
function Button({
  children,
  onClick,
  type,
  variant,
  size,
  fullWidth,
  active,
  disabled,
  ariaLabel,
}) {
```
- `children` — Butonun içindəki məzmun (mətn, emoji). `<Button>✏️ Edit</Button>` yazanda `✏️ Edit` `children`-dir.
- `onClick` — Klikdə çağırılacaq funksiya.
- `type` — `'button'`, `'submit'`, `'reset'`. Default `'button'`. Form içindəki butonların səhvən formu submit etməsi üçün vacibdir.
- `variant` — Görünüş növü: `'primary'` (mavi), `'dashed'` (nöqtəli kənar), `'ghost'` (şəffaf), `'danger'` (qırmızı).
- `size` — `'sm'`, `'md'`, `'lg'`.
- `fullWidth` — `true` olduqda buton bütün eni tutur.
- `active` — Yalnız `ghost` variant üçün. Tab aktiv olduqda fərqli stil göstərir.
- `disabled` — Buton deaktiv edilir.
- `ariaLabel` — Ekran oxuyucuları üçün. İkon-only butonlarda mətn olmur, buna görə `ariaLabel` əlavə edilir.

```jsx
  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.full : '',
    variant === 'ghost' && active ? styles.ghostActive : '',
  ]
    .filter(Boolean)
    .join(' ')
```

**Sətir-sətir:**
- `styles.btn` — Hər zaman tətbiq olunan əsas buton class-ı.
- `styles[variant]` — `variant='primary'` olduqda `styles.primary` CSS class-ını alır.
- `styles[size]` — `size='sm'` olduqda `styles.sm` CSS class-ını alır.
- `fullWidth ? styles.full : ''` — `fullWidth=true` olarsa `styles.full` əlavə edilir, yoxsa boş string.
- `variant === 'ghost' && active ? styles.ghostActive : ''` — Yalnız ghost+active kombinasiyasında xüsusi class tətbiq edilir.
- `.filter(Boolean)` — Boş string `''` və `undefined` kimi falsy dəyərləri array-dən silir.
- `.join(' ')` — Array-i boşluqla birləşdirir: `"btn primary sm"`.

```jsx
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
```
- `aria-label={ariaLabel}` — Accessibility üçün. `✕` butonunda `ariaLabel="Remove entry"` göndərilir.

```jsx
Button.defaultProps = {
  onClick: undefined,
  type: 'button',
  variant: 'primary',
  size: 'md',
  fullWidth: false,
  active: false,
  disabled: false,
  ariaLabel: undefined,
}
```
- `defaultProps` — Props göndərilmədikdə istifadə ediləcək default dəyərlər. `<Button>Klik</Button>` yazdıqda avtomatik `type='button'`, `variant='primary'`, `size='md'` olur.

---

## FormInput.jsx

```jsx
function FormInput({ label, id, type, value, onChange, placeholder, required }) {
```
- `label` — Input-un üstündə göstərilən mətn: `"First Name"`.
- `id` — Input-un unikal identifikatoru. `<label htmlFor={id}>` ilə input-u bağlamaq üçün vacibdir (accessibility).
- `type` — `'text'`, `'email'`, `'tel'`, `'month'`. Default `'text'`.
- `value` — Controlled input üçün. State-dən gəlir.
- `onChange` — Dəyər dəyişdikdə çağırılır.
- `placeholder` — Boş olduqda göstərilən hint mətn.
- `required` — `true` olarsa, `*` işarəsi göstərilir.

```jsx
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>
```
- `{required && <span>...}` — `required` `true`-dursa `*` göstərilir, `false`-dursa heç nə göstərilmir.

```jsx
      <input
        className={styles.input}
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
```
- `onChange={e => onChange(e.target.value)}` — React-ın native `onChange` event-i `SyntheticEvent` obyekti qaytarır. `e.target.value` ilə yalnız dəyəri götürürük, sonra `onChange` prop-una göndəririk. Beləcə alt komponent event-i bilmirdi, sadəcə string dəyər alır.

---

## FormTextarea.jsx

FormInput ilə demək olar ki, eynidir. Fərq:
- `<input>` əvəzinə `<textarea>` istifadə edilir.
- `rows` prop-u əlavə edilib — neçə sətir hündürlükdə olacağını bildirir.

---

## FormSelect.jsx

```jsx
function FormSelect({ label, id, value, onChange, options, required }) {
```
- `options` — `[{ value: 'Beginner', label: '🔵 Beginner' }, ...]` şəklindəki array.

```jsx
      <select
        className={styles.select}
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
```
- `options.map(opt => <option ...>)` — Hər seçeneği `<option>` elementinə çevirir.
- `key={opt.value}` — React-ın differencing algoritmi üçün unikal açar.
- `value={value}` — Controlled select. Select-in cari seçimi state-dən idarə edilir.

---

## SectionCard.jsx

```jsx
function SectionCard({ icon, title, children }) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}
```

**Nə edir?**
- Hər form bölməsini (Personal, Summary, Experience...) eyni görünüşlü çərçivəyə (karta) sarar.
- `icon` prop-u isteğe bağlıdır — verilmədikdə render edilmir (`{icon && ...}`).
- `children` — Kartın içinə qoyulan hər şey. Bu, composability-dir: `<SectionCard>` istənilən content qəbul edir.

**Niyə `section` teqi?**
- Semantic HTML. Hər bölmə `<section>` ilə sarılmışdır — ekran oxuyucuları için daha başa düşülən strukturdur.

---

## EntryCard.jsx

```jsx
import { useState } from 'react'

function EntryCard({ title, onRemove, children, defaultOpen }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
```
- `isOpen` — Kartın açıq/bağlı olduğunu bildirir. Başlanğıcda `defaultOpen` prop-undan gəlir (`true` by default).

```jsx
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setIsOpen(prev => !prev)}
        >
```
- `onClick={() => setIsOpen(prev => !prev)}` — Klikdə `isOpen` dəyərini tersine çevirir. Açıqsa bağlayır, bağlıysa açır. `prev => !prev` — cari state-in tersini alır.

```jsx
          <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>▶</span>
          <span className={styles.title}>{title || 'Untitled'}</span>
```
- `isOpen ? styles.arrowOpen : ''` — Açıq olduqda ox CSS ilə 90° döndürülür (▶ → ▼ effekti).
- `{title || 'Untitled'}` — Title boşdursa `'Untitled'` göstərilir.

```jsx
        <Button
          variant="danger"
          size="sm"
          onClick={onRemove}
          ariaLabel="Remove entry"
        >
          ✕
        </Button>
```
- `onRemove` — Üst komponentdən gəlan silmə funksiyası. EntryCard özü silmir — yalnız bildirir.

```jsx
      {isOpen && <div className={styles.body}>{children}</div>}
```
- `{isOpen && ...}` — `isOpen` `false`-dursa DOM-a heç nə əlavə edilmir (unmount edilir). Bu performans baxımından faydalıdır.

---

## Form Komponentlər

---

## ResumeForm.jsx

```jsx
function ResumeForm({ resumeData, handlers }) {
  const { personal, summary, experience, education, skills, projects } = resumeData
```
- **Destructuring** — `resumeData.personal`, `resumeData.summary`... yazmaq əvəzinə, birbaşa `personal`, `summary` kimi istifadə etmək üçün.

```jsx
  const {
    updatePersonal,
    updateSummary,
    ...
  } = handlers
```
- `handlers` obyektindən funksiyaları destructure edir — alt-komponentlərə ayrı-ayrı prop kimi göndərmək üçün.

```jsx
  return (
    <form className={styles.panel} onSubmit={e => e.preventDefault()}>
```
- `<form>` — Semantic HTML. Daxilindəki `required` fieldlər brauzer tərəfindən yoxlanacaq.
- `onSubmit={e => e.preventDefault()}` — Default form submit davranışını ləğv edir. Olmasa, "Add Experience" butonuna basanda səhifə yenilənəcəkdi.

---

## PersonalInfoSection.jsx

```jsx
function PersonalInfoSection({ personal, onUpdate }) {
  return (
    <SectionCard icon="👤" title="Personal Information">
      <div className={`${styles.grid} ${styles.grid2}`}>
```
- `${styles.grid} ${styles.grid2}` — İki CSS class birlikdə: `grid` əsas grid strukturunu, `grid2` 2 sütunlu layout-u verir.

```jsx
        <FormInput
          label="First Name"
          id="firstName"
          value={personal.firstName}
          onChange={val => onUpdate('firstName', val)}
          placeholder="John"
          required
        />
```
- `value={personal.firstName}` — State-dən oxunur. Bu **controlled component** nümunəsidir.
- `onChange={val => onUpdate('firstName', val)}` — Dəyər dəyişdikdə `App.jsx`-dəki `updatePersonal('firstName', val)` çağırılır.
- `required` — JSX-də prop adını yazmaq kifayətdir, `required={true}` ilə eynidir.

---

## SummarySection.jsx

```jsx
function SummarySection({ summary, onUpdate }) {
  return (
    <SectionCard icon="📝" title="Professional Summary">
      <FormTextarea
        label="Write a compelling summary about yourself"
        id="summary"
        value={summary}
        onChange={onUpdate}
        ...
      />
    </SectionCard>
  )
}
```
- `onChange={onUpdate}` — Burada `val => onUpdate(val)` yerinə birbaşa `onUpdate` yazılıb. `FormTextarea`, `onChange`-ə artıq yalnız string göndərir, buna görə `App.jsx`-dəki `updateSummary` birbaşa istifadə edilə bilər.

---

## ExperienceSection.jsx

```jsx
function ExperienceSection({ experiences, onAdd, onUpdate, onRemove }) {
  return (
    <SectionCard icon="💼" title="Work Experience">
      <div className={styles.entries}>
        {experiences.map(exp => (
          <EntryCard
            key={exp.id}
            title={
              exp.position && exp.company
                ? `${exp.position} @ ${exp.company}`
                : exp.position || exp.company || 'New Experience'
            }
            onRemove={() => onRemove(exp.id)}
          >
```
- `experiences.map(exp => ...)` — Hər experience üçün bir `EntryCard` render edir.
- `key={exp.id}` — React-ın siyahı elementlərini tanımaq üçün istifadə etdiyi unikal açar. `key` olmasa, elementlər silinib əlavə edildikdə React bu dəyişikliyi düzgün tanıya bilmər.
- **Title logic:** `exp.position && exp.company` ikisi də doluysa `"Senior Dev @ Google"` göstərir. Biri boşdursa, dolunun özünü göstərir. İkisi də boşdursa `'New Experience'` göstərir.
- `onRemove={() => onRemove(exp.id)}` — `exp.id`-ni "closure"a alır. `EntryCard`-ın ✕ butonuna basılanda hansı element silinəcəyini bilir.

```jsx
              <div>
                <div style={{ fontSize: '0.775rem', ... }}>End Date</div>
                {exp.current ? (
                  <div className={styles.inputDisabled}>Present</div>
                ) : (
                  <input type="month" ... />
                )}
              </div>
```
- `exp.current` `true`-dursa "Present" yazısı göstərilir, input deaktiv olur. `false`-dursa ay seçimi üçün input göstərilir.

```jsx
            <div className={styles.checkboxField}>
              <input
                type="checkbox"
                id={`exp-current-${exp.id}`}
                checked={exp.current}
                onChange={e => {
                  onUpdate(exp.id, 'current', e.target.checked)
                  if (e.target.checked) onUpdate(exp.id, 'endDate', '')
                }}
              />
```
- `e.target.checked` — Checkbox üçün `.value` yox, `.checked` istifadə edilir (boolean).
- `if (e.target.checked) onUpdate(exp.id, 'endDate', '')` — "Hələ burada işləyirəm" işarələnəndə `endDate` silinir.

---

## EducationSection.jsx

```jsx
const DEGREE_OPTIONS = [
  { value: '', label: 'Select degree…' },
  { value: "Bachelor's", label: "Bachelor's" },
  ...
]
```
- `DEGREE_OPTIONS` — Komponent xaricindədir. Hər render-də yenidən yaranmaması üçün. Bu sabit məlumatdır, state-ə bağlı deyil.
- `{ value: '', label: 'Select degree…' }` — Placeholder seçenek. SELECT-də boş dəyər ilkin olaraq göstərilir.

```jsx
            title={
              edu.school
                ? edu.degree
                  ? `${edu.school} — ${edu.degree}`
                  : edu.school
                : 'New Education'
            }
```
- **İç-içə ternary:** `school` varsa, `degree` də varsa ikisini birlikdə göstər. `degree` yoxdursa yalnız `school`. İkisi də yoxdursa `'New Education'`.

---

## SkillsSection.jsx

```jsx
const LEVEL_OPTIONS = [
  { value: 'Beginner', label: '🔵 Beginner' },
  { value: 'Elementary', label: '🟢 Elementary' },
  { value: 'Intermediate', label: '🟡 Intermediate' },
  { value: 'Advanced', label: '🟠 Advanced' },
  { value: 'Expert', label: '🔴 Expert' },
]
```
- Rəngli emoji ilə vizual olaraq fərqləndirilir.
- `value` field-i — state-də saxlanılan dəyər.
- `label` field-i — dropdown-da göstərilən mətn.

```jsx
            title={skill.name ? `${skill.name} — ${skill.level}` : 'New Skill'}
```
- `skill.name` varsa `"React — Advanced"` göstərilir, yoxdursa `'New Skill'`.

---

## ProjectsSection.jsx

```jsx
            title={project.name || 'New Project'}
```
- Ən sadə title məntiqi — ad varsa onu göstər, yoxdursa `'New Project'`.

---

## Preview Komponentlər

---

## ResumePreview.jsx

```jsx
function ResumePreview({ resumeData }) {
  const { personal, summary, experience, education, skills, projects } = resumeData

  const handlePrint = () => window.print()
```
- `window.print()` — Brauzerun çap dialoqunu açır. CSS-də `@media print` qaydaları ilə UI elementlər gizlənir, yalnız CV çap edilir.

```jsx
  return (
    <div className={styles.wrapper}>
      <div className={styles.printBar}>
        <Button variant="primary" size="sm" onClick={handlePrint}>
          🖨 Download / Print PDF
        </Button>
      </div>

      <div className={styles.cv} id="cv-document">
        <CVSidebar personal={personal} skills={skills} education={education} />
        <CVMain
          personal={personal}
          summary={summary}
          experience={experience}
          projects={projects}
        />
      </div>
    </div>
  )
}
```
- `id="cv-document"` — Lazım gəlsə JavaScript ilə hədəfləmək üçün. Həmçinin CSS `@media print` üçün.
- **CVSidebar** sol sütunu alır: kontakt, skills, education.
- **CVMain** sağ əsas hissəni alır: ad, summary, experience, projects.

---

## CVMain.jsx

### `formatDate` funksiyası

```jsx
function formatDate(dateStr) {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[parseInt(month, 10) - 1]} ${year}`
}
```

**Sətir-sətir:**
- `if (!dateStr) return ''` — Boş string gəlsə, boş qaytarır (crash etmir).
- `dateStr.split('-')` — `'2022-03'` → `['2022', '03']` edir.
- `const [year, month] = ...` — Array destructuring. `year = '2022'`, `month = '03'`.
- `months[parseInt(month, 10) - 1]` — `'03'` → `3` (string-den int-ə, `10` radix-dir) → `3 - 1 = 2` (array 0-dan başlayır) → `months[2]` = `'Mar'`.
- Nəticə: `'Mar 2022'`.

### `fullName` dəyişəni

```jsx
  const fullName = [personal.firstName, personal.lastName].filter(Boolean).join(' ')
```
- `[personal.firstName, personal.lastName]` → `['John', 'Doe']` array.
- `.filter(Boolean)` — Biri boşdursa (`''`), silinir.
- `.join(' ')` — `'John Doe'` — boşluqla birləşdirir.
- Nəticə: İkisi doluysa `'John Doe'`, yalnız ad varsa `'John'`, ikisi boşdursa `''`.

### Şərti render

```jsx
      {summary && (
        <section>
          <h2 className={styles.sectionTitle}>Profile</h2>
          <p className={styles.summaryText}>{summary}</p>
        </section>
      )}
```
- `{summary && ...}` — `summary` boşdursa bu bölmə hiç render edilmir. CV-də boş bölmələr görünmür.

```jsx
      {experience.length > 0 && (
        <section>...</section>
      )}
```
- `experience.length > 0` — Experience massivi boşdursa "Work Experience" bölməsi göstərilmir.

### Texnologiyaların render edilməsi

```jsx
              {project.technologies && (
                <div className={styles.techList}>
                  {project.technologies.split(',').map(t => t.trim()).filter(Boolean).map((tech, i) => (
                    <span key={i} className={styles.techChip}>{tech}</span>
                  ))}
                </div>
              )}
```
- `project.technologies.split(',')` — `'React, Node.js, MongoDB'` → `['React', ' Node.js', ' MongoDB']`.
- `.map(t => t.trim())` — Hər elementin əvvəl/sonundakı boşluqları silir → `['React', 'Node.js', 'MongoDB']`.
- `.filter(Boolean)` — Boş stringləri (məs. sonda vergül qoyulmuşsa) silir.
- `.map((tech, i) => <span key={i}...>)` — Hər texnologiyanı ayrı chip/badge kimi render edir.
- `key={i}` — Burada id olmadığından index `i` istifadə edilir (bu hal üçün məqbuldur — sıra dəyişmir).

---

## CVSidebar.jsx

### `LEVEL_DOTS` və `TOTAL_DOTS`

```jsx
const LEVEL_DOTS = {
  Beginner: 1,
  Elementary: 2,
  Intermediate: 3,
  Advanced: 4,
  Expert: 5,
}
const TOTAL_DOTS = 5
```
- Hər bacarıq səviyyəsini nöqtə sayına çevirir. `'Advanced'` → 4 dolu nöqtə.
- Komponent xaricindədir — render-ə bağlı deyil, sabit məlumatdır.

### `getInitials` funksiyası

```jsx
function getInitials(firstName, lastName) {
  const f = firstName ? firstName[0].toUpperCase() : ''
  const l = lastName ? lastName[0].toUpperCase() : ''
  return f + l || '?'
}
```
- `firstName[0].toUpperCase()` — Adın ilk hərfini böyük hərf edir.
- `f + l || '?'` — İkisi boşdursa `''` olur, `''` falsy-dir, buna görə `'?'` göstərilir.
- Nəticə: `"John Doe"` → `"JD"`, boşdursa `"?"` avatar göstərilir.

### `contactItems` massivi

```jsx
  const contactItems = [
    { icon: '✉', value: personal.email },
    { icon: '✆', value: personal.phone },
    { icon: '◎', value: personal.location },
    { icon: '⊕', value: personal.website },
    { icon: 'in', value: personal.linkedin },
  ].filter(item => item.value)
```
- Əvvəlcə bütün kontakt sahələrini icon ilə birlikdə array-ə qoyur.
- `.filter(item => item.value)` — Dəyəri boş olan kontaktları silir. Telefon daxil edilməmişsə sidebar-da görünmür.

### Nöqtəli skill progress bar

```jsx
              <div className={styles.dotTrack}>
                {Array.from({ length: TOTAL_DOTS }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`${styles.dot} ${idx < (LEVEL_DOTS[skill.level] ?? 3) ? styles.dotFilled : ''}`}
                  />
                ))}
              </div>
```
- `Array.from({ length: 5 })` → `[undefined, undefined, undefined, undefined, undefined]` — 5 elementli array yaradır.
- `.map((_, idx) => ...)` — `_` — element dəyəri lazım deyil (ignore edilir). `idx` — 0,1,2,3,4.
- `idx < (LEVEL_DOTS[skill.level] ?? 3)` — `'Advanced'` → `LEVEL_DOTS['Advanced']` = 4. `idx < 4` olduqda dolu (filled) nöqtə, `idx >= 4` olduqda boş nöqtə.
- `?? 3` — Nullish coalescing operator. `LEVEL_DOTS[skill.level]` `undefined` qaytarsa (naməlum səviyyə), default olaraq 3 götürülür.

### Education tarixləri

```jsx
          {education.map(edu => {
            const startDate = formatDate(edu.startDate)
            const endDate = formatDate(edu.endDate)
            const dateRange = [startDate, endDate].filter(Boolean).join(' – ')
```
- `[startDate, endDate].filter(Boolean).join(' – ')` — İkisi doluysa `'Sep 2018 – Jun 2022'`. Biri boşdursa yalnız dolunun özü göstərilir.

---

## PropTypes haqqında

```jsx
Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'dashed', 'ghost', 'danger']),
  ...
}
```

**Niyə PropTypes istifadə edilib?**
- TypeScript olmadan prop tipini yoxlamağın yolu.
- Development-də yanlış prop göndərildikdə console-da xəbərdarlıq göstərir.
- `.isRequired` — Prop mütləq göndərilməlidir, yoxdursa xəbərdarlıq.
- `PropTypes.oneOf([...])` — Yalnız siyahıdakı dəyərlərdən biri qəbul edilir.
- `PropTypes.arrayOf(PropTypes.shape({...}))` — Array-in hər elementinin strukturunu təyin edir.

---

## index.jsx faylları haqqında

Hər komponent qovluğunda `index.jsx` var:

```jsx
// components/ui/Button/index.jsx
export { default } from './Button'
```

**Niyə?**
- `import Button from '@/components/ui/Button'` yazmağa imkan verir.
- `import Button from '@/components/ui/Button/Button'` yazmaqdan qurtarır.
- Node.js qovluğa `import` edildikdə avtomatik `index.js`/`index.jsx` axtarır.

---

## Ümumi Arxitektura Qeydləri

| Konsept | Necə istifadə edilib |
|---|---|
| **Single Source of Truth** | Bütün state yalnız `App.jsx`-dədir |
| **Controlled Components** | Bütün input-lar `value` prop-u ilə state-dən idarə edilir |
| **Lifting State Up** | State App-da, handlers prop ilə alt komponentlərə düşür |
| **Immutable Updates** | `...spread`, `.map()`, `.filter()` — heç vaxt state birbaşa dəyişdirilmir |

| **Composition** | `SectionCard`, `EntryCard` ümumi struktur, `children` konkret content verir |
| **PropTypes** | Runtime type checking — TypeScript olmadan prop validasiyası |

---

## Foto Yükləmə (Photo Upload)

`PersonalInfoSection`-da avatar sahəsi əlavə edilib. İstifadəçi şəkil seçdikdə `FileReader` API ilə base64 data URL-ə çevrilir və `App.jsx`-dəki `personal.photo` state-inə yazılır.

```jsx
const handlePhotoChange = e => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = ev => onUpdate('photo', ev.target.result)
  reader.readAsDataURL(file)
}
```

- Şəkil yoxdursa `firstName` + `lastName`-in baş hərfləri initials kimi göstərilir.
- `CVSidebar`-da da eyni foto göstərilir — `personal.photo` prop-u `CVSidebar`-a ötürülür.
- PDF-də çap zamanı foto da görünür (`print-color-adjust: exact` sayəsində).

---

## Ad / Soyad Validasiyası (Name Regex)

`src/utils/validation.js`-ə `name` qaydası əlavə edilib:

```js
name: {
  test: v => /^[a-zA-Z\u00C0-\u024F\s\-']+$/.test(v.trim()),
  message: 'Name must only contain letters (no numbers or symbols)',
},
```

- `\u00C0-\u024F` — aksentli hərflər (é, ñ, ü, ş, ç və s.) qəbul edilir.
- Rəqəm daxil etmək mümkün deyil.
- `firstName` və `lastName` fieldləri `validate={['required', 'name']}` ilə yoxlanılır.

---

## Formik Lazımdırmı?

**Xeyr.** Bu proyektdə Formik lazım deyil.

- Formik əsasən form **submission**, server-side validation, mürəkkəb `touched` tracking üçün gücldür.
- Bu appda form **submit** yoxdur — hər dəyişiklik anında live preview-a əks olunur.
- Mövcud `validation.js` + `FormInput` blur validation sistemi kifayətdir.
- Əlavə dependency gətirmək məntiqi deyil.

---

## Dark Theme (Form Tərəfi)

Form paneli tam dark tema ilə dizayn edilib:

| Element | Rəng |
|---|---|
| Fon (App) | `#0f1623` |
| Form panel | `#131c2e` |
| Input fon | `rgba(255,255,255,0.04)` |
| Əsas accent | `#6366f1` (indigo) |
| İkinci accent | `#06b6d4` (cyan) |
| Xəta rəngi | `#f87171` (red) |

---

## CV Preview Dizaynı — Sky Blue Tema

CV preview (çap edilən hissə) sky blue `#38bdf8` / `#0ea5e9` aksentlə yenidən dizayn edilib:

### Sidebar (Sol Sütun)
- Fon: `#0f172a` (dark slate)
- Accent: `#38bdf8` (sky blue)
- Avatar: dairəvi, sky blue border + glow kölgəsi
- Foto varsa şəkil göstərilir, yoxdursa initials
- Skills: progress bar stili — `linear-gradient(90deg, #38bdf8, #0ea5e9)`
- Contact linklər: `mailto:`, `tel:`, `https://` formatında tıklanabilir

### Main (Sağ Sütun)
- Fon: `#ffffff` (ağ)
- Ad: `color: #0f172a` — solid, gradient yox
- Ad altında 48px sky blue underline accent
- Job title: `#f0f9ff` bg + `#bae6fd` border pill
- Section başlıqları: 3px vertical `#0ea5e9` bar + `#e0f2fe` xətt
- Tarix pillləri: `#f0f9ff` bg + `#bae6fd` border + `#0ea5e9` mətn (dark gradient yox)
- Timeline dot: ağ dairə + `#38bdf8` border
- Tech chips: `#f0f9ff` / `#bae6fd` / `#0ea5e9`
