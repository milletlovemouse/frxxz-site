---
title: 核心关系图谱
description: 韩立、掌天瓶、功法、法宝、灵宠、法则与势力的关系图。
---

# 核心关系图谱

核心关系图谱用于把长文本拆成可视化关系，以 Mermaid 展示韩立、掌天瓶、功法、法宝、灵宠、法则与势力之间的核心关联。

```mermaid
graph TD
  HanLi[韩立] -->|持有| PalmBottle[掌天瓶]
  PalmBottle -->|关联| TimeLaw[时间法则]
  PalmBottle -->|催熟| SpiritHerbs[灵草灵药]
  PalmBottle -->|孕育机缘| XuantianVine[玄天仙藤]
  XuantianVine -->|结出| XuantianFruit[玄天仙果]
  XuantianFruit -->|化为| XuantianSword[玄天斩灵剑]
  XuantianSword -->|蕴含| DestructionLaw[毁灭法则]

  HanLi -->|修炼| Changchun[长春功]
  HanLi -->|修炼| Qingyuan[青元剑诀]
  Qingyuan -->|配套| BambooSwords[青竹蜂云剑]
  BambooSwords -->|组成| Dageng[大庚剑阵]
  BambooSwords -->|组成| Chunli[春黎剑阵]
  BambooSwords -->|组成| Qingpan[青蟠剑阵]

  HanLi -->|修炼| Dayan[大衍诀]
  Dayan -->|增强| DivineSense[神识]
  Dayan -->|支持| PuppetControl[傀儡操控]
  PuppetControl -->|代表| NascentPuppet[元婴级傀儡]
  Dayan -->|传承自| DayanSage[大衍神君]
  DayanSage -->|创立| Qianzhu[千竹教]

  HanLi -->|灵宠/伙伴| SoulCry[啼魂]
  SoulCry -->|克制| Ghosts[阴魂鬼物]
  SoulCry -->|关联| Nether[幽冥界]
  HanLi -->|灵虫| GoldBug[噬金虫]
  GoldBug -->|进化| GoldChild[金童]
  GoldBug -->|克制| Metals[五金法宝]

  HanLi -->|修炼| TrueMantra[真言化轮经]
  TrueMantra -->|传承| TruthGate[真言门]
  TruthGate -->|主修| TimeLaw
  GuHuoJin[古或今] -->|占据/代表| TimeLaw
  GuHuoJin -->|掌控| HeavenlyCourt[天庭]
  ReincarnationLord[轮回殿主] -->|修炼| ReincarnationLaw[轮回法则]
  ReincarnationLord -->|建立/领导| ReincarnationTemple[轮回殿]
  ShiChuankong[石穿空] -->|修炼| SpaceLaw[空间法则]
  DemonLord[魔主/石空鱼] -->|道祖| SpaceLaw

  TimeLaw -->|至尊法则| Supreme[三大至尊法则]
  SpaceLaw -->|至尊法则| Supreme
  ReincarnationLaw -->|至尊法则| Supreme
  ChaosLaw[混沌法则] -->|源头/更古老| Supreme
```

## 关系边类型

- `修炼`：人物 -> 功法。
- `持有`：人物 -> 法宝。
- `所属`：人物 -> 势力。
- `位于`：地域 -> 界面。
- `克制`：功法/法宝/灵兽 -> 对象。
- `材料`：法宝/丹药 -> 材料。
- `进阶为`：境界/灵兽/法宝 -> 高阶形态。
- `传承自`：功法/技艺 -> 创始人/宗门。
- `对应`：妖兽等级 -> 修士境界。
