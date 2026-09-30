const RUN_VARIETY_QUESTIONS = [
  {
    "type": "LORE",
    "answer": "Arthas Menethil",
    "options": [
      "Arthas Menethil",
      "Bolvar Fordragon",
      "Tirion Fordring",
      "Uther"
    ],
    "prompt": "Un ancien prince a basculé du côté du Fléau. Sa lame runique vole les âmes. Il règne sur la Couronne de glace. Qui est-ce ?",
    "fact": "Un ancien prince a basculé du côté du Fléau. Sa lame runique vole les âmes. Il règne sur la Couronne de glace.",
    "source": "https://worldofwarcraft.blizzard.com/fr-fr/"
  },
  {
    "type": "LORE",
    "answer": "Jaina Portvaillant",
    "options": [
      "Jaina Portvaillant",
      "Katherine Portvaillant",
      "Sylvanas Coursevent",
      "Tyrande Murmevent"
    ],
    "prompt": "Cette mage a dirigé Theramore. Elle appartient à la famille dirigeante de Kul Tiras. Elle devient Grand Amiral de Kul Tiras. Qui est-ce ?",
    "fact": "Cette mage a dirigé Theramore. Elle appartient à la famille dirigeante de Kul Tiras. Elle devient Grand Amiral de Kul Tiras.",
    "source": "https://worldofwarcraft.blizzard.com/fr-fr/"
  },
  {
    "type": "LORE",
    "answer": "Illidan Hurlorage",
    "options": [
      "Illidan Hurlorage",
      "Malfurion Hurlorage",
      "Kael’thas Haut-Soleil",
      "Akama"
    ],
    "prompt": "Il a combattu les démons avec leurs propres pouvoirs. Il s’empare des armes du démon Azzinoth. Le Traître vous attend au Temple noir. Qui est-ce ?",
    "fact": "Il a combattu les démons avec leurs propres pouvoirs. Il s’empare des armes du démon Azzinoth. Le Traître vous attend au Temple noir.",
    "source": "https://worldofwarcraft.blizzard.com/fr-fr/"
  },
  {
    "type": "LORE",
    "answer": "Sylvanas Coursevent",
    "options": [
      "Sylvanas Coursevent",
      "Alleria Coursevent",
      "Vereesa Coursevent",
      "Calia Menethil"
    ],
    "prompt": "Elle a défendu Quel’Thalas de son vivant. Arthas l’a relevée sous la forme d’une banshee. Elle devient la dirigeante des Réprouvés. Qui est-ce ?",
    "fact": "Elle a défendu Quel’Thalas de son vivant. Arthas l’a relevée sous la forme d’une banshee. Elle devient la dirigeante des Réprouvés.",
    "source": "https://worldofwarcraft.blizzard.com/fr-fr/"
  },
  {
    "type": "LORE",
    "answer": "Medivh",
    "options": [
      "Medivh",
      "Khadgar",
      "Antonidas",
      "Malygos"
    ],
    "prompt": "Un mystérieux prophète avertit les peuples avant la Troisième Guerre. Il est associé au bâton Atiesh et à Karazhan. Il fut un Gardien de Tirisfal corrompu par Sargeras. Qui est-ce ?",
    "fact": "Un mystérieux prophète avertit les peuples avant la Troisième Guerre. Il est associé au bâton Atiesh et à Karazhan. Il fut un Gardien de Tirisfal corrompu par Sargeras.",
    "source": "https://worldofwarcraft.blizzard.com/fr-fr/"
  },
  {
    "type": "LORE",
    "answer": "Neltharion",
    "options": [
      "Neltharion",
      "Nozdormu",
      "Malygos",
      "Kalecgos"
    ],
    "prompt": "Cet Aspect était chargé de la Terre. La corruption des Dieux très anciens l’a changé. Il sera connu sous le nom d’Aile de mort. Qui est-ce ?",
    "fact": "Cet Aspect était chargé de la Terre. La corruption des Dieux très anciens l’a changé. Il sera connu sous le nom d’Aile de mort.",
    "source": "https://worldofwarcraft.blizzard.com/fr-fr/"
  },
  {
    "type": "INTRUS",
    "answer": "Onyxia",
    "options": [
      "Ragnaros",
      "Magmadar",
      "Garr",
      "Onyxia"
    ],
    "prompt": "Dossier Cœur du Magma · écarte le boss qui vient d’un autre raid.",
    "fact": "Onyxia possède son propre repaire. Ragnaros, Magmadar et Garr se rencontrent au Cœur du Magma.",
    "source": "https://worldofwarcraft.blizzard.com/fr-fr/"
  },
  {
    "type": "INTRUS",
    "answer": "Illidan Hurlorage",
    "options": [
      "Kel’Thuzad",
      "Sapphiron",
      "Le Recousu",
      "Illidan Hurlorage"
    ],
    "prompt": "Dossier Naxxramas · écarte le boss étranger.",
    "fact": "Illidan se rencontre au Temple noir. Les trois autres boss appartiennent à Naxxramas.",
    "source": "https://worldofwarcraft.blizzard.com/fr-fr/"
  },
  {
    "type": "INTRUS",
    "answer": "Dame Vashj",
    "options": [
      "Moroes",
      "Le Conservateur",
      "Prince Malchezaar",
      "Dame Vashj"
    ],
    "prompt": "Dossier Karazhan · un nom est infiltré.",
    "fact": "Dame Vashj se rencontre dans la Caverne du sanctuaire du Serpent. Les autres sont à Karazhan.",
    "source": "https://worldofwarcraft.blizzard.com/fr-fr/"
  },
  {
    "type": "INTRUS",
    "answer": "Sindragosa",
    "options": [
      "Hodir",
      "Freya",
      "Mimiron",
      "Sindragosa"
    ],
    "prompt": "Dossier Ulduar · un boss ne vient pas de ce raid.",
    "fact": "Sindragosa se rencontre à la Citadelle de la Couronne de glace. Les trois gardiens sont à Ulduar.",
    "source": "https://worldofwarcraft.blizzard.com/fr-fr/"
  },
  {
    "type": "INTRUS",
    "answer": "Supremus",
    "options": [
      "Brutallus",
      "Gangrebrume",
      "Kil’jaeden",
      "Supremus"
    ],
    "prompt": "Dossier Plateau du Puits de soleil · repère l’intrus.",
    "fact": "Supremus garde le Temple noir. Les trois autres boss appartiennent au Plateau du Puits de soleil.",
    "source": "https://worldofwarcraft.blizzard.com/fr-fr/"
  },
  {
    "type": "INTRUS",
    "answer": "Hakkar",
    "options": [
      "Nalorakk",
      "Akil’zon",
      "Malacrass",
      "Hakkar"
    ],
    "prompt": "Dossier Zul’Aman, version raid de TBC · un nom vient d’ailleurs.",
    "fact": "Hakkar est le boss de Zul’Gurub classique. Nalorakk, Akil’zon et Malacrass sont à Zul’Aman.",
    "source": "https://worldofwarcraft.blizzard.com/fr-fr/"
  }
];
