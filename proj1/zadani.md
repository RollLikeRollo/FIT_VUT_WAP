# Literatura:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols  
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*  
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield   
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*  
https://nodejs.medium.com/announcing-a-new-experimental-modules-1be8d2d6c2ff

# Popis:
Cílem projektu je seznámit se a pochopit programovací konstrukty jazyku JavaScript, objekty, řetězec prototypů, konstruktory, iterátory a generátory. Vaším úkolem bude:

1. Vytvořit knihovnu iterate obsahující funkci iterateProperties generující názvy vlastností dostupných pro předaný objekt a jeho řetězec prototypů.
2. Názvy vlastností generované iterateProperties je možné omezit filtrem nad popsiovačem vlastností (property descriptor).
2. Vaši knihovnu dokumentujte a otestujte,
Očekává se využití a spuštění knihovny pomocí Node.js. Ukázkový soubor použití knihovny můžete najít v Moodle včetně očekávaného výstupu.

# Knihovna iterate.mjs

Knihovna pojmenovaná iterate.mjs bude součástí odevzdaného souboru a bude exportovat jediný generátor - iterateProperties.

Generátor iterateProperties bude očekávat až dva parametry:

Povinný parametr obsahující objekt, jehož vlastnosti se budou knihovnou procházet.
Volitelný parametr obsahující popisovač vlastností. Pokud bude přítomen, pak uživatel knihovny očekává, že bude generátor generovat pouze jména vlastností, které se striktně shodují s předanou hodnotou. Pakliže některé hodnoty nebudou dodaným popisovačem vlastnosti specifikované (undefined), pak na základě nich nebude probíhat filtrace.
Zajistěte, aby bylo možné generátor volat opakovaně a bylo tak možné iterátorovat nad vlastnostmi více objektů zároveň. Předpokládejte, že v průběhu iterace nebudou objekty ani jejich řetězec prototypů měněny.

### Očekávané vlastnosti knihovny:

Poskytuje jediný exportovaný generátor iterateProperties().
Snažte se psát efektivní, dokumentovaný a čitelný kód.
Odevzdejte testy, kterými jste knihovnu testovali.

# Testy knihovny

V rámci vypracování projektu byste si měli vytvořit testy. Skript test.sh by měl spouštět tyto testy (spuštěný bez parametrů). Pokud budete pro testy potřebovat instalovat závislosti, implementujte parametr install pro testovací skript.

# Dokumentace

Projekt dokumentujte pomocí dokumentačních řetězců přímo v kódu knihovny. Využijte nástroje jako je JSDoc, Doxygen apod. Vytvořte soubor doc.sh, který po spuštění vygeneruje dokumentaci z dokumentačních řetězců.

# Pravidla vypracování projektů

Studenti ve své práci musí pracovat samostatně a tvůrčím způsobem. Vytvořený kód by měl být přehledný a komentovaný, či samopopisný. Nelze kopírovat příklady řešení, hotová řešení nebo obdobné podklady, které jsou zveřejněny nebo jsou studentům jinak dostupné (jedná se o kopírování celých řešení nebo jejich tak velkých částí, že jejich okopírování vede k funkčně shodnému nebo velmi obdobnému řešení zadání). Není dovolená společná práce ve skupinách tak, že její výsledky jsou potom odevzdávány jako řešení jednotlivce (jednotlivců).

Studenti se musí zdržet jednání, které je v rozporu s dobrými mravy a které by mohlo vést k obcházení skutečného způsobu "řešení" zadání v duchu těchto zadání jimi samotnými nebo jinými studenty. Pokud student(i) poruší výše uvedená pravidla, může mu hodnocení projektu být sníženo až na 0 bodů.

# Odevzdání

Do IS je třeba odevzdejte komprimovaný projekt ve formátu zip. Odevzdávaný soubor pojmenujte jako login.zip. Po rozbalení odevzdaného souboru vzniknou v aktuálním adresáři soubory iterate.mjs, test.sh a doc.sh, současně mohou vyniknout další soubory zmíněné v zadání, nebo vámi požadované.

Odevzdávejte pouze Vámi vytvořené soubory, přebírání jakéhokoliv cizího kódu není povoleno.

# Orientační hodnocení projektu

program na testovacích datech vykazuje očekávané chování - 5b.,
kvalita implementace a čitelnost kódu a dokumentace, vhodné využití jazyka JavaScript - 3b.,
kvalita vlastních testů - 2b.
Formální chyby, které nebudou tolerovány:

odevzdaný soubor nelze spustit a odzkoušet: 0 bodů
odevzdáno po termínu: 0 bodů
nedodržení zadání: 0 bodů
nefunkční kód: 0 bodů
opsáno: 0 bodů (pro všechny, kdo mají stejný kód), návrh na zahájení disciplinárního řízení.

# Kompatibilita

Uveďte ve které verzi node jste vaše řešení testovali.

# Doporučená literatura

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*
https://nodejs.medium.com/announcing-a-new-experimental-modules-1be8d2d6c2ff
