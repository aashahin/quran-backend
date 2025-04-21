# Quran

**Thanks for**
- [Fawaz Ahmed](https://github.com/fawazahmed0/quran-api) for providing the Quran API

** API Documentation:**
- [ApiDog](https://bxe80xpsqm.apidog.io/)

**URL Structure:**

`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@{apiVersion}/{endpoint}`

**Formats:**

The Endpoints Supports HTTP GET Method and returns the data in  two formats:

`/{endpoint}.json`

`/{endpoint}.min.json`

The above formats also work for fallback i.e if `.min.json` link fails, you can use `.json` link and vice versa

**Warning:** You should include fallback mechanism in your code, [to avoid issues](https://github.com/fawazahmed0/quran-api/issues/27)

**Endpoints:**

- `/editions`<br>
> Lists all the available editions in prettified json format:<br>
[https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions.json](https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions.json "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions.json") <br>

> Get a minified version of it:<br>
[https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions.min.json](https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions.min.json "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions.min.json")

- `/editions/{editionName}`<br>
> Get the whole quran/quran translation:<br>
[https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan.json](https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan.json "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan.json") <br>

> Get a latin(roman) script version of it by adding -la:<br>
[https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan-la.json](https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan-la.json "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan-la.json")<br>

> Get a latin(roman) script with diacritical marks by adding -lad:<br>
[https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan-lad.json](https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan-lad.json "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan-lad.json")

- `/editions/{editionName}/{ChapterNo}` <br>
> Get the whole chapter 5:<br>
[https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan-la/5.json](https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan-la/5.json "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan-la/5.json")

> Get the whole chapter 5 in minified format:<br>
[https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan-la/5.min.json](https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan-la/5.min.json "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan-la/5.min.json")

- `/editions/{editionName}/{ChapterNo}/{VerseNo}` <br>
> Get Chapter 5 verse 10:<br>
[https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan-lad/5/10.json](https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan-lad/5/10.json "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan-lad/5/10.json")

- `/editions/{editionName}/juzs/{juzNo}` <br>
> Get juz 3:<br>
[https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan-lad/juzs/3.json](https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan-lad/juzs/3.json "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan-lad/juzs/3.json")

Similarly:
- `/editions/{editionName}/rukus/{rukuNo}`
- `/editions/{editionName}/pages/{pageNo}`
- `/editions/{editionName}/manzils/{manzilNo}`
- `/editions/{editionName}/maqras/{maqraNo}`<br>

- `/info` <br>
> Get all the details about quran such as number of juzs,sajdas, rukus etc in quran <br>
[https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/info.json](https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/info.json "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/info.json")<br>

- `/fonts` <br>
> Lists arabic fonts available: <br>
[https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/fonts.json](https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/fonts.json "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/fonts.json")<br>

### Displaying Text:
- Use [Arabic Fonts](https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/fonts.json) to display the Quran text. In case the font shows few [tofu characters](https://english.stackexchange.com/questions/62524/what-do-you-call-the-phenomenon-where-a-rectangle-is-shown-because-a-font-lack), then use fonts with [-full suffix](https://github.com/fawazahmed0/quran-api/blob/1468ba338f744c8eec4208fe36808206febe4add/fonts.json#L195) which has complete Arabic Unicode Support.<br>
  Refer [font-full](https://github.com/fawazahmed0/quran-api/blob/1/fontfull.md) to know more.

- Use [Google Noto Fonts](https://www.google.com/get/noto/) to display the translation. By default OS doesn't have font installed for every language. So you will have to use fonts for few languages such as [Burmese](https://www.google.com/get/noto/#serif-mymr) etc, to show properly. Otherwise you will end up with [tofu characters](https://english.stackexchange.com/questions/62524/what-do-you-call-the-phenomenon-where-a-rectangle-is-shown-because-a-font-lack).


## List of Qiraat

### 1. Qaloon
- **Name**: قَالُون
```json
   "ara_quranqaloon": {
        "name": "ara-quranqaloon",
        "author": "Quran Qaloon",
        "language": "Arabic",
        "direction": "rtl",
        "source": "https://qurancomplex.gov.sa/",
        "comments": "Version 8 ,The verse numbering of this quran has been changed to Uthmanic version, so that Apps can easily use this, and people can benefit from it, If you want the copy with original verse numbering, please go to https://fonts.qurancomplex.gov.sa/ , The following characters were replaced (to open fathatan,dammatan and kasratan) to conform to unicode standard,'ٖ'(u+0656)->'ࣲ'(u+08f2),'ٗ'(u+0657)->'ࣰ'(u+08f0),'ٞ'(u+065E)->'ࣱ'(u+08f1) , You can use qaloon fonts with full suffix to view this text",
        "link": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranqaloon.json",
        "linkmin": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranqaloon.min.json"
    },
```

### 2. Qunbul
- **Name**: قنبل
```json
  "ara_quranqumbul": {
        "name": "ara-quranqumbul",
        "author": "Quran Qumbul",
        "language": "Arabic",
        "direction": "rtl",
        "source": "https://qurancomplex.gov.sa/",
        "comments": "Version 7 ,The verse numbering of this quran has been changed to Uthmanic version, so that Apps can easily use this, and people can benefit from it, If you want the copy with original verse numbering, please go to https://fonts.qurancomplex.gov.sa/, The following characters were replaced (to open fathatan,dammatan and kasratan) to conform to unicode standard,'ٖ'(u+0656)->'ࣲ'(u+08f2),'ٗ'(u+0657)->'ࣰ'(u+08f0),'ٞ'(u+065E)->'ࣱ'(u+08f1) , You can use qumbul fonts with full suffix to view this text",
        "link": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranqumbul.json",
        "linkmin": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranqumbul.min.json"
    },
```

### 3. Shouba
- **Name**: شعبة
```json
    "ara_quranshouba": {
"name": "ara-quranshouba",
"author": "Quran Shouba",
"language": "Arabic",
"direction": "rtl",
"source": "https://qurancomplex.gov.sa/",
"comments": "Version 7, Please use the quran complex shouba fonts to view this text properly, The following characters were replaced (to open fathatan,dammatan and kasratan) to conform to unicode standard,'ٖ'(u+0656)->'ࣲ'(u+08f2),'ٗ'(u+0657)->'ࣰ'(u+08f0),'ٞ'(u+065E)->'ࣱ'(u+08f1) , You can use shouba fonts with full suffix to view this text",
"link": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranshouba.json",
"linkmin": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranshouba.min.json"
},
```

### 4. Soosi
- **Name**: سوسي
```json
        "ara_quransoosi": {
        "name": "ara-quransoosi",
        "author": "Quran Soosi",
        "language": "Arabic",
        "direction": "rtl",
        "source": "https://qurancomplex.gov.sa/",
        "comments": "Version 8 ,The verse numbering of this quran has been changed to Uthmanic version, so that Apps can easily use this, and people can benefit from it, If you want the copy with original verse numbering, please go to https://fonts.qurancomplex.gov.sa/ , The following characters were replaced (to open fathatan,dammatan and kasratan) to conform to unicode standard,'ٖ'(u+0656)->'ࣲ'(u+08f2),'ٗ'(u+0657)->'ࣰ'(u+08f0),'ٞ'(u+065E)->'ࣱ'(u+08f1) and also 'ۭ'(u+06ED)->'ٜ'(u+065c), You can use soosi fonts with full suffix to view this text",
        "link": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quransoosi.json",
        "linkmin": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quransoosi.min.json"
    },
    "ara_quransoosinonun": {
        "name": "ara-quransoosinonun",
        "author": "Quran Soosi Non Unicode",
        "language": "Arabic",
        "direction": "rtl",
        "source": "https://qurancomplex.gov.sa/",
        "comments": "Version 8 ,The verse numbering of this quran has been changed to Uthmanic version, so that Apps can easily use this, and people can benefit from it, If you want the copy with original verse numbering, please go to https://fonts.qurancomplex.gov.sa/, Please use the quran complex soosi fonts to view this text properly",
        "link": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quransoosinonun.json",
        "linkmin": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quransoosinonun.min.json"
    },
```

### 5. Warsh
- **Name**: ورش
```json
    "ara_quranwarsh": {
"name": "ara-quranwarsh",
"author": "Quran Warsh",
"language": "Arabic",
"direction": "rtl",
"source": "https://qurancomplex.gov.sa/",
"comments": "Version 8, The verse numbering of this quran has been changed to Uthmanic version, so that Apps can easily use this, and people can benefit from it, If you want the copy with original verse numbering, please go to https://fonts.qurancomplex.gov.sa/, The following characters were replaced (to open fathatan,dammatan and kasratan) to conform to unicode standard,'ٖ'(u+0656)->'ࣲ'(u+08f2),'ٗ'(u+0657)->'ࣰ'(u+08f0),'ٞ'(u+065E)->'ࣱ'(u+08f1) , You can use warsh fonts with full suffix to view this text",
"link": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranwarsh.json",
"linkmin": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranwarsh.min.json"
},
```

### 6. Hafs
- **Name**: حفص
```json
   "ara_quranuthmanihaf": {
        "name": "ara-quranuthmanihaf",
        "author": "Quran Uthmani Hafs",
        "language": "Arabic",
        "direction": "rtl",
        "source": "https://qurancomplex.gov.sa/",
        "comments": "Version 13, Please use the quran complex Uthamnic fonts to view this text properly, The following characters were replaced (to open fathatan,dammatan and kasratan) to conform to unicode standard,'ٖ'(u+0656)->'ࣲ'(u+08f2),'ٗ'(u+0657)->'ࣰ'(u+08f0),'ٞ'(u+065E)->'ࣱ'(u+08f1) , You can use uthamic hafs fonts with full suffix to view this text",
        "link": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranuthmanihaf.json",
        "linkmin": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranuthmanihaf.min.json"
    },
    "ara_quranuthmanihaf1": {
        "name": "ara-quranuthmanihaf1",
        "author": "Quran Uthmani Hafs No Diacritics",
        "language": "Arabic",
        "direction": "rtl",
        "source": "https://qurancomplex.gov.sa/",
        "comments": "",
        "link": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranuthmanihaf1.json",
        "linkmin": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranuthmanihaf1.min.json"
    }
```

### 7. Al-Bazzi
- **Name**: البزي
```json
"ara_quranbazzi": {
"name": "ara-quranbazzi",
"author": "Quran Bazzi",
"language": "Arabic",
"direction": "rtl",
"source": "https://qurancomplex.gov.sa/",
"comments": "Version 7 ,The verse numbering of this quran has been changed to Uthmanic version, so that Apps can easily use this, and people can benefit from it, If you want the copy with original verse numbering, please go to https://fonts.qurancomplex.gov.sa/ , The following characters were replaced (to open fathatan,dammatan and kasratan) to conform to unicode standard,'ٖ'(u+0656)->'ࣲ'(u+08f2),'ٗ'(u+0657)->'ࣰ'(u+08f0),'ٞ'(u+065E)->'ࣱ'(u+08f1) , You can use bazzi fonts with full suffix to view this text",
"link": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranbazzi.json",
"linkmin": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranbazzi.min.json"
},
```

#### 8. Al-Duri
- **Name**: الدوري
```json
    "ara_qurandoori": {
"name": "ara-qurandoori",
"author": "Quran Doori",
"language": "Arabic",
"direction": "rtl",
"source": "https://qurancomplex.gov.sa/",
"comments": "Version 8 ,The verse numbering of this quran has been changed to Uthmanic version, so that Apps can easily use this, and people can benefit from it, If you want the copy with original verse numbering, please go to https://fonts.qurancomplex.gov.sa/ , The following characters were replaced (to open fathatan,dammatan and kasratan) to conform to unicode standard,'ٖ'(u+0656)->'ࣲ'(u+08f2),'ٗ'(u+0657)->'ࣰ'(u+08f0),'ٞ'(u+065E)->'ࣱ'(u+08f1) and also 'ۭ'(u+06ED)->'ٜ'(u+065c), You can use doori fonts with full suffix to view this text",
"link": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-qurandoori.json",
"linkmin": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-qurandoori.min.json"
},
"ara_qurandoorinonun": {
"name": "ara-qurandoorinonun",
"author": "Quran Doori Non Unicode",
"language": "Arabic",
"direction": "rtl",
"source": "https://qurancomplex.gov.sa/",
"comments": "Version 8 ,The verse numbering of this quran has been changed to Uthmanic version, so that Apps can easily use this, and people can benefit from it, If you want the copy with original verse numbering, please go to https://fonts.qurancomplex.gov.sa/, Please use the quran complex doori fonts to view this text properly",
"link": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-qurandoorinonun.json",
"linkmin": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-qurandoorinonun.min.json"
},
```

## Tafsir
### 1. Tafsir King Fahd
- **Name**: تفسير الملك فهد
```json
  "ara_kingfahadquranc": {
"name": "ara-kingfahadquranc",
"author": "King Fahad Quran Complex",
"language": "Arabic",
"direction": "rtl",
"source": "http://tanzil.net",
"comments": "",
"link": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-kingfahadquranc.json",
"linkmin": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-kingfahadquranc.min.json"
},
```

### 2. Tafsir Al-Siraj
- **Name**: تفسير السراج
```json
  "ara_sirajtafseer": {
        "name": "ara-sirajtafseer",
        "author": "Siraj Tafseer",
        "language": "Arabic",
        "direction": "rtl",
        "source": "https://quranenc.com",
        "comments": "",
        "link": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-sirajtafseer.json",
        "linkmin": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-sirajtafseer.min.json"
    },
    "ara_sirajtafseernod": {
        "name": "ara-sirajtafseernod",
        "author": "Siraj Tafseer No Diacritics",
        "language": "Arabic",
        "direction": "rtl",
        "source": "https://quranenc.com",
        "comments": "Diacritics removed for easier searching",
        "link": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-sirajtafseernod.json",
        "linkmin": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-sirajtafseernod.min.json"
    },
```

### 3. Tafsir Al-Jalalayn
- **Name**: تفسير الجلالين
```json
    "ara_jalaladdinalmah": {
"name": "ara-jalaladdinalmah",
"author": "Jalal Ad Din Al Mahalli And Jalal Ad Din As Suyuti",
"language": "Arabic",
"direction": "rtl",
"source": "http://tanzil.net",
"comments": "",
"link": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-jalaladdinalmah.json",
"linkmin": "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-jalaladdinalmah.min.json"
},
```

## Audio
https://mp3quran.net/ar/api

## Fonts
https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/fonts.json
