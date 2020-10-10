/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 50731
 Source Host           : localhost:3306
 Source Schema         : user

 Target Server Type    : MySQL
 Target Server Version : 50731
 File Encoding         : 65001

 Date: 09/10/2020 19:30:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `originalname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES (3, 'vue.xmind', '7591ffda01603e656e5bcfc7182b921a.xmind', '2020-10-09 13:28:40');
INSERT INTO `file` VALUES (4, 'avatar.jpg', 'ce033ec98be8e59b94ff77f55028f277.jpg', '2020-10-09 13:28:40');
INSERT INTO `file` VALUES (5, 'vue.png', '6bd14ace68fd184bd38c3dd19b99051f.png', '2020-10-09 13:28:40');
INSERT INTO `file` VALUES (6, 'avatar.jpg', '4e5242bcd3af668f414283e1fb6d187f.jpg', '2020-10-09 13:29:20');
INSERT INTO `file` VALUES (7, 'vue.png', 'b23e71cd070499a679846ccf15ffb1ee.png', '2020-10-09 13:29:20');
INSERT INTO `file` VALUES (8, 'vue.xmind', '89647396e08d4631680c7885d14117c0.xmind', '2020-10-09 13:29:20');
INSERT INTO `file` VALUES (9, '安服实习生9月绩效考核表-2020年9月更新.xlsx', '1d08bca97ae971b6ed7dc40c5b1d36e0.xlsx', '2020-10-09 13:29:20');
INSERT INTO `file` VALUES (10, '安服实习生绩效考核汇总表-2020年7月(1).xlsx', '70896a24ee0d0dad76dff8b4d25973c2.xlsx', '2020-10-09 13:29:20');
INSERT INTO `file` VALUES (11, 'avatar.jpg', '82c1de419c9f20ac16e72cc5a8286bd9.jpg', '2020-10-09 15:45:09');
INSERT INTO `file` VALUES (12, 'vue.png', '1d92315b740a461faaacc1e7203e5d2d.png', '2020-10-09 15:45:09');
INSERT INTO `file` VALUES (13, '安服实习生9月绩效考核表-2020年9月更新.xlsx', '9b209f5069c52358871f02103827be95.xlsx', '2020-10-09 15:45:09');
INSERT INTO `file` VALUES (14, 'vue.xmind', '77d0ca7b2030c7d99c68addfff6e299d.xmind', '2020-10-09 15:45:09');
INSERT INTO `file` VALUES (15, '安服实习生绩效考核汇总表-2020年7月(1).xlsx', '84a8a18f3477195dbc11638a561d2913.xlsx', '2020-10-09 15:45:09');
INSERT INTO `file` VALUES (16, 'vue.xmind', 'dddb0762778a1a9b7b7f0d1dce9c313e.xmind', '2020-10-09 18:05:57');
INSERT INTO `file` VALUES (17, 'vue.xmind', '4160e89a38cb4be2d249a4142a514418.xmind', '2020-10-09 18:06:35');
INSERT INTO `file` VALUES (18, 'vue.png', 'ce322060cca99fbb04ba769265e0e7d0.png', '2020-10-09 18:07:51');
INSERT INTO `file` VALUES (19, 'vue.xmind', '91772ae6dfbc2c975205fcefc18a59a1.xmind', '2020-10-09 18:11:18');
INSERT INTO `file` VALUES (20, 'vue.xmind', 'f04b8a0ce17b75423f9f6a1c099acec2.xmind', '2020-10-09 18:13:16');

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `status` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES (9, '水水水水水水水水水水水水水水水水', '2020-10-05 18:32:24', 1);
INSERT INTO `message` VALUES (10, '666666666666666666', '2020-10-05 18:36:53', 1);
INSERT INTO `message` VALUES (11, '钱钱钱钱钱钱钱钱钱钱钱钱钱钱钱', '2020-10-05 18:40:12', 1);
INSERT INTO `message` VALUES (12, '水水水水水水水水水水水水水水水水水水水', '2020-10-05 18:40:18', 1);
INSERT INTO `message` VALUES (13, '杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀', '2020-10-05 18:40:31', 1);
INSERT INTO `message` VALUES (14, '顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶', '2020-10-05 18:40:31', 1);
INSERT INTO `message` VALUES (15, '水水水水水水水水水水水水水水水水水水水', '2020-10-07 15:35:12', 0);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '123456',
  `gender` tinyint(1) NOT NULL,
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `role` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '韩畅畅', '123456', 0, '15657122362', 'hcc96923@gmail.com', '2020-10-09 15:32:27', '22a9af0c1a56e19295e08924a535ed38.jpg', '韩畅畅上传头像', 3);
INSERT INTO `user` VALUES (2, '曹青青', '123456', 1, '15157122361', 'hcc96923@gmail.com', '2020-09-30 19:36:13', 'd24714ac28f401865d48424d66032e66.jpg', '', 1);
INSERT INTO `user` VALUES (3, '韩文龙', '123456', 0, '15157122365', '734499162@qq.com', '2020-09-18 18:29:40', '', '', 1);
INSERT INTO `user` VALUES (4, '曹操', '123456', 0, '15657122369', 'hcc@163.com', '2020-09-18 18:29:48', '', '', 1);
INSERT INTO `user` VALUES (5, '刘备', '123456', 0, '18147275149', '734499162@qq.com', '2020-09-18 18:30:00', '', '', 1);
INSERT INTO `user` VALUES (6, '孙权', '123456', 0, '18147275149', 'hcc96923@gmail.com', '2020-09-18 18:30:04', '', '', 1);
INSERT INTO `user` VALUES (7, '诸葛亮', '123456', 0, '15157122361', 'hcc@163.com', '2020-09-18 18:30:20', '', '', 1);
INSERT INTO `user` VALUES (8, '貂蝉', '123456', 1, '15657122362', '734499162@qq.com', '2020-09-18 18:30:26', '', '', 1);
INSERT INTO `user` VALUES (9, '大乔', '123456', 1, '15657122362', 'hcc96923@gmail.com', '2020-09-18 18:30:23', '', '', 1);
INSERT INTO `user` VALUES (10, '小乔', '123456', 1, '15657122369', 'hcc@163.com', '2020-09-18 18:30:30', '', '', 1);
INSERT INTO `user` VALUES (11, '张飞', '123456', 1, '15657122362', 'hcc96923@gmail.com', '2020-09-18 18:30:35', '', '', 1);
INSERT INTO `user` VALUES (12, '赵云', '123456', 1, '18147275149', 'hcc96923@gmail.com', '2020-09-18 18:30:38', '', '', 1);
INSERT INTO `user` VALUES (13, '关羽', '123456', 1, '15157122365', 'hcc96923@gmail.com', '2020-09-18 18:30:53', '', '', 1);
INSERT INTO `user` VALUES (14, '蔡夫人', '123456', 0, '15657122362', 'hcc96923@gmail.com', '2020-09-18 18:30:45', '', '', 1);
INSERT INTO `user` VALUES (16, '静姝', '123456', 0, '15157122361', 'hcc96923@gmail.com', '2020-09-18 18:30:41', '', '', 1);
INSERT INTO `user` VALUES (19, '古天乐', '123456', 0, '15157122365', '123456@163.com', '2020-09-18 18:31:02', '', '', 1);
INSERT INTO `user` VALUES (20, '刘青云', '123456', 0, '18147275149', '19898@qq.com', '2020-09-18 18:30:59', '', '', 1);
INSERT INTO `user` VALUES (37, '张家辉', '123456', 0, '15657122369', '19898@qq.com', '2020-09-18 18:30:56', '', '', 1);
INSERT INTO `user` VALUES (38, '三上悠亚', '123456', 1, '15157122365', '19898@qq.com', '2020-10-09 15:32:56', '', '', 1);
INSERT INTO `user` VALUES (39, '王祖贤', '147258', 0, '', '', '2020-10-08 15:47:14', '170ae6b552dee8bd5ddd0752dc862415.jpg_b', '', 1);
INSERT INTO `user` VALUES (40, '桥本有菜', '123456', 1, '18147275149', '123456@163.com', '2020-10-09 15:33:47', '', '', 1);

SET FOREIGN_KEY_CHECKS = 1;
