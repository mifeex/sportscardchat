--
-- MySQL 5.5.25
-- Mon, 18 May 2020 11:47:19 +0000
--

CREATE TABLE `categories` (
   `id` int(10) unsigned not null auto_increment,
   `category` varchar(15) not null,
   `last_posts` bigint(20) not null,
   `counts` int(10) not null,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=6;

INSERT INTO `categories` (`id`, `category`, `last_posts`, `counts`) VALUES 
('2', 'Breaks', '60', '6'),
('3', 'Sports cards', '58', '9'),
('4', 'General chat', '55', '3'),
('5', 'Discover', '57', '5');

CREATE TABLE `comment` (
   `id` bigint(20) not null auto_increment,
   `post` bigint(20) not null,
   `user` bigint(20) not null,
   `date` varchar(15) not null,
   `comment_text` int(10) not null,
   `hasImage` tinyint(1) not null,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=25;

INSERT INTO `comment` (`id`, `post`, `user`, `date`, `comment_text`, `hasImage`) VALUES 
('9', '58', '7', 'Sun May 17 2020', '23', '0'),
('10', '58', '7', 'Sun May 17 2020', '24', '0'),
('11', '58', '7', 'Sun May 17 2020', '25', '0'),
('12', '58', '7', 'Sun May 17 2020', '26', '0'),
('13', '58', '7', 'Sun May 17 2020', '27', '0'),
('14', '58', '7', 'Sun May 17 2020', '28', '0'),
('15', '59', '7', 'Sun May 17 2020', '29', '0'),
('16', '55', '7', 'Sun May 17 2020', '30', '0'),
('17', '55', '7', 'Sun May 17 2020', '31', '0'),
('18', '55', '7', 'Sun May 17 2020', '32', '0'),
('19', '60', '7', 'Sun May 17 2020', '33', '0'),
('20', '60', '7', 'Sun May 17 2020', '34', '0'),
('21', '60', '7', 'Sun May 17 2020', '35', '0'),
('22', '54', '7099', 'Sun May 17 2020', '36', '0'),
('23', '54', '7099', 'Sun May 17 2020', '37', '0'),
('24', '54', '7', 'Sun May 17 2020', '38', '0');

CREATE TABLE `comment_text` (
   `id` int(10) not null auto_increment,
   `comment_text` text not null,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=39;

INSERT INTO `comment_text` (`id`, `comment_text`) VALUES 
('23', 'Hello world'),
('24', 'Hello fucking world<strong> Yeah I`m crazy<i> s-o-b</i></strong> '),
('25', 'Wow! This bumd ass shit working! I`m fucking happy'),
('26', 'Shit!!! This shit working! FUCK!!!'),
('27', 'Shit!!! This shit working! FUCK!!!'),
('28', 'Yeah, \"Р—Р°РµР±РёСЃСЊ\"'),
('29', 'Hello fucking world!!!'),
('30', 'Hello guy! I`m new here!!<ul>\n <li>Р‘Р»СЏС‚СЊ, РјРµРЅСЏ Р±РµСЃРёС‚ РґРµСЂСЊРјРѕ СЃ С‚РµРј, С‡С‚Рѕ РІСЃС‚Р°РІРєР° РґРµР»Р°РµС‚СЃСЏ РЅР° РѕРґРёРЅ С€Р°Рі РЅР°Р·Р°Рґ Рё РїРѕР»СѓС‡Р°РµС‚СЃСЏ РєР°РєР°СЏ-С‚Рѕ Р·Р°РґРЅРёС†Р°</li> \n<li>Damn it, shit infuriates me with the fact that the insertion is done one step back and it turns out some kind of ass</li>\n</ul>'),
('31', 'Hello shit'),
('32', 'Hello shit'),
('33', 'Hello fucking piece of shit'),
('34', 'Hello fucking piece of shit'),
('35', 'Hello fucking piece of shit. I`m crazy!!'),
('36', 'Hello crazy man! I`m testing this'),
('37', 'Hey man, you`re crazy'),
('38', 'WTF? Why I`m Mifeex? Because you use cookie!');

CREATE TABLE `main` (
   `id` int(10) unsigned not null auto_increment,
   `user_data` bigint(20) not null,
   `post_data` bigint(20),
   `categories_id` int(1) not null,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=7;

INSERT INTO `main` (`id`, `user_data`, `post_data`, `categories_id`) VALUES 
('1', '1', '1', '1'),
('2', '2', '2', '2'),
('3', '3', '3', '3'),
('4', '4', '4', '4'),
('5', '5', '5', '5'),
('6', '6', '6', '1');

CREATE TABLE `post` (
   `id` bigint(20) not null auto_increment,
   `post_category` int(1) not null,
   `counts` int(5) not null,
   `tag` varchar(30) not null,
   `user_data` bigint(20) not null,
   `date` varchar(20) not null,
   `post` int(10) not null,
   `hasImage` tinyint(1) not null,
   `last_comment` int(10) not null,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=61;

INSERT INTO `post` (`id`, `post_category`, `counts`, `tag`, `user_data`, `date`, `post`, `hasImage`, `last_comment`) VALUES 
('1', '2', '19', 'Hello world!', '1', '02.02.2020', '1', '0', '0'),
('2', '2', '27', 'I\'m working with React here', '2', '12.01.2019', '2', '0', '0'),
('3', '3', '37', 'somebody once told me...', '3', '22.12.2019', '3', '0', '0'),
('4', '4', '7', 'How to be healthy', '4', '12.02.2018', '4', '0', '0'),
('5', '5', '23', 'About me :)', '5', '02.02.2020', '5', '0', '0'),
('6', '2', '91', 'Wow! BI-2!', '6', '20.12.2014', '6', '0', '0'),
('7', '3', '45', 'Hi', '7', '02:02:2020', '56', '0', '0'),
('12', '4', '0', 'Pornomovies has new album', '7', 'Tue May 12 2020', '84', '0', '0'),
('13', '3', '0', 'agdsbdhnfds', '7099', 'Wed May 13 2020', '110', '0', '0'),
('49', '5', '0', 'Testing new 121', '9', 'Thu May 14 2020', '108', '0', '0'),
('50', '4', '0', 'Hello Something go wrong. Sorr', '7099', 'Thu May 14 2020', '109', '0', '0'),
('51', '2', '0', 'Let`s test our system now', '7', 'Thu May 14 2020', '110', '0', '0'),
('52', '3', '0', 'Here we testing our system aga', '7', 'Thu May 14 2020', '111', '0', '0'),
('53', '3', '0', 'Let`s test our system', '7', 'Thu May 14 2020', '112', '0', '0'),
('54', '2', '3', 'Hello, Hello', '7', 'Thu May 14 2020', '113', '0', '24'),
('55', '4', '3', 'Yeah we will chat here!', '7', 'Thu May 14 2020', '114', '0', '18'),
('56', '3', '0', 'Cool let`s test news backed', '7', 'Thu May 14 2020', '115', '0', '0'),
('57', '5', '0', 'Hi guy', '7099', 'Thu May 14 2020', '116', '0', '0'),
('58', '3', '6', 'Sorry. Goodbye. Hi', '7099', 'Fri May 15 2020', '118', '0', '14'),
('59', '2', '1', 'Hello! Guy', '7099', 'Fri May 15 2020', '119', '0', '15'),
('60', '2', '3', 'I want to test new', '7', 'Sat May 16 2020', '120', '1', '21');

CREATE TABLE `post_text` (
   `id` int(10) not null auto_increment,
   `text` longtext,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=121;

INSERT INTO `post_text` (`id`, `text`) VALUES 
('28', '<strong>And this situation exposes</strong> one systemic problem in our labor market. If you deal with her on a personal level - get an advantage.\n\nLet is start from afar. There is a good rule in marketing, expressed by the aphorism: \"People do not need drills. People need holes. \" This is about the fact that customers often do not need a tool at all, but a solution to a specific problem. And the more accurately we understand what this problem is, the better we can solve it.\n\nIn fact, people often also do not need holes. They need to fix something. And therefore, competitors to your drills will be not only drills of a different brand, but also double-sided tape and \"liquid nails\". It is not always necessary to drill.'),
('29', '<strong>Hello<i> world</i></strong> \n\n\nDmitry, good afternoon / evening!\nThanks for your awesome React / Editors course.\nIf it is not difficult, could you answer one question:\nThe bottom line is that I am watching your course and at the same time leading a project to create a forum. I am watching lesson\n 82 now, and on my project I am doing a feature for adding a post. There are buttons that add different html tags, such as <strong> </strong>.\n Since I did not find a better alternative, I solved this problem like this:\n\nBut, this is all the lyrics, in my opinion, necessary for putting in the know. Next, there are scripts adding a tag </br> when wrapping a line if there is no tag\n\nQUESTION: am I doing the right thing from the architectural side, which one do you propose (did other projects using the local state) or is there still\n some confusion and you need to put all this into the reducer?\nThanks in advance!!!\nP.S. Once again, many thanks for the course. I am donating'),
('31', '<strong><q>Hello</q><i> world</i></strong> \n\nDmitry, good afternoon / evening!\nThanks for your awesome React / Editors course.\nIf it is not difficult, could you answer one question:\nThe bottom line is that I am watching your course and at the same time leading a project to create a forum. I am watching lesson\n 82 now, and on my project I am doing a feature for adding a post. There are buttons that add different html tags, such as <strong> </strong>.\n Since I did not find a better alternati'),
('32', 've, I solved this problem like this:\n\nBut, this is all the lyrics, in my opinion, necessary for putting in the know. Next, there are scripts adding a tag </br> when wrapping a line if there is no tag\n\nQUESTION: am I doing the right thing from the architectural side, which one do you propose (did other projects using the local state) or is there still\n some confusion and you need to put all this into the reducer?\nThanks in advance!!!\nP.S. Once again, many thanks for the course. I am donating'),
('35', 'Hello world\n\nDmitry, good afternoon / evening!\nThanks for your awesome React / Editors course.\nIf it is not difficult, could you answer one question:\nThe bottom line is that I am watching your course and at the same time leading a project to create a forum. I am watching lesson\n 82 now, and on my project I am doing a feature for adding a post. There are buttons that add different html tags, such as <strong> </strong>.\n Since I did not find a better alternative, I solved thi'),
('36', 's problem like this:\n\nBut, this is all the lyrics, in my opinion, necessary for putting in the know. Next, there are scripts adding a tag </br> when wrapping a line if there is no tag\n\nQUESTION: am I doing the right thing from the architectural side, which one do you propose (did other projects using the local state) or is there still\n some confusion and you need to put all this into the reducer?\nThanks in advance!!!\nP.S. Once again, many thanks for the course. I am donating'),
('108', 'Hello world\n\nDmitry, good afternoon / evening!\nThanks for your awesome React / Editors course.\nIf it is not difficult, could you answer one question:\nThe bottom line is that I am watching your course and at the same time leading a project to create a forum. I am watching lesson\n 82 now, and on my project I am doing a feature for adding a post. There are buttons that add different html tags, such as <strong> </strong>.\n Since I did not find a better alternative, I solved this problem like this:\n\nBut, this is all the lyrics, in my opinion, necessary for putting in the know. Next, there are scripts adding a tag </br> when wrapping a line if there is no tag\n\nQUESTION: am I doing the right thing from the architectural side, which one do you propose (did other projects using the local state) or is there still\n some confusion and you need to put all this into the reducer?\nThanks in advance!!!\nP.S. Once again, many thanks for the course. I am donating'),
('109', 'Hello, I am sorry to tall that, but can we set more long deadline?\n\nof cuorse I will try to do that during current deadline...\n\njust I think that we can not have time to do every detail beautiful'),
('110', 'So, now we`re going to test <strong>this</strong> system. Here two bugs. <i>First</i>: when we add tag we can add in inside our letter.\n<i>Second</i>: we can`t see it we add new post. Here two bugs. Firstly post added in DB with strange logic. Second, our component don`t rerender if server send some data here'),
('111', 'Here we will test our system  again<strong>!!!!</strong> '),
('112', 'Here we still test our system  again<strong>!!!!</strong> '),
('113', 'Hello, Hello, Hello'),
('114', '<q>Two guy chatting here on our growing forum</q>\n<ul>\n <li><i>Wow! Yo, man, let`s chat here!</i></li> \n<li><strong>Yeah we will chat here!</strong></li>\n</ul>'),
('115', 'I added new fiture. Cool let`s test news backed'),
('116', 'Hi guy! It`s really cool shit!'),
('117', 'Hello fucking forum!'),
('118', 'Ah, we are listening Pornomuvies has \"Sorry. Goodbay. Hi\"'),
('119', 'ahhh\n\ni see..\n\nI hope you figure out without too much headache!! Im sure it can drive someone mad'),
('120', 'I want to test new image uploading');

CREATE TABLE `user` (
   `id` bigint(20) not null auto_increment,
   `username` varchar(10),
   `password` varchar(60),
   `date` varchar(20),
   `posts` int(10) not null,
   `influencer` tinyint(1) not null,
   `email` varchar(30),
   `hasImage` tinyint(1) not null,
   `image` mediumtext not null,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=7100;

INSERT INTO `user` (`id`, `username`, `password`, `date`, `posts`, `influencer`, `email`, `hasImage`, `image`) VALUES 
('7', 'Evgeny', '$2b$10$QU2iKf5kGdiAQ3LtZb31fuGdmsLxwtadsc8IoHJVJYYH5yM/Ovgh2', 'Fri May 08 2020', '7', '1', 'tevgeiy@mail.ru', '1', 'http://localhost:4000/userPhoto/addedpic_7.jpg'),
('9', 'sportscard', '$2b$10$2pi3Frt4f5ZzcLVKAYJgX.Twcuwn7pTeJ9SovxSOgmFEWSPbtb0Y6', 'Wed May 13 2020', '0', '0', 'dsv1409@mail.ru', '0', ''),
('7099', 'MifeeX', '', 'Wed May 13 2020', '5', '0', '', '1', 'https://cdn.discordapp.com/avatars/552879238601113621/0049126ec586085210d950946570a279.png?size=512');