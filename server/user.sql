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

 Date: 26/10/2020 19:04:26
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
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

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
INSERT INTO `file` VALUES (21, 'vue.xmind', '29dac6dc4d3011fa072c55095cc8db40.xmind', '2020-10-10 18:35:25');
INSERT INTO `file` VALUES (22, '39f7f9f59d8549d3b55d7e7d7c5e519b_tplv-k3u1fbpfcp-zoom-1.png', 'eacba38c37e05c0b14edb1aa9020475d.png', '2020-10-26 18:55:29');
INSERT INTO `file` VALUES (23, '39f7f9f59d8549d3b55d7e7d7c5e519b_tplv-k3u1fbpfcp-zoom-1.png', '803aea4ba67d07ed437b6870d5493387.png', '2020-10-26 18:57:23');
INSERT INTO `file` VALUES (24, 'avatar.png', '6e2e6534c90f3e066c1a8ab0c7c96b0b.png', '2020-10-26 18:57:23');
INSERT INTO `file` VALUES (25, 'Vue 初始化到渲染 DOM 的整个过程.png', '41c36ff3cb42b7375d4d92403233d5b1.png', '2020-10-26 18:57:23');
INSERT INTO `file` VALUES (26, 'vue.png', 'f29ad98dbeb91c059c542347bb117982.png', '2020-10-26 18:57:23');
INSERT INTO `file` VALUES (27, '39f7f9f59d8549d3b55d7e7d7c5e519b_tplv-k3u1fbpfcp-zoom-1.png', '2500eb1a9c905882de248c84ecb74a60.png', '2020-10-26 18:58:33');
INSERT INTO `file` VALUES (28, '安服实习生9月绩效考核表-2020年9月更新.xlsx', '1863aba1df4bf29f0fe77d62756c1c63.xlsx', '2020-10-26 18:58:33');
INSERT INTO `file` VALUES (29, '安服实习生绩效考核汇总表-2020年7月(1).xlsx', '88c293bfd03a7236af1c41e3b69a7b89.xlsx', '2020-10-26 18:58:33');
INSERT INTO `file` VALUES (30, 'avatar.png', 'd45c82822bedd03f1b30d842014f6da9.png', '2020-10-26 18:58:33');
INSERT INTO `file` VALUES (31, 'Vue 初始化到渲染 DOM 的整个过程.png', 'ce92dca3b4bbb4c4365211575aa50f3d.png', '2020-10-26 18:58:33');
INSERT INTO `file` VALUES (32, 'vue.png', 'b5214bdaf5da4cff1ef8baada2856839.png', '2020-10-26 18:58:33');
INSERT INTO `file` VALUES (33, '邓宁-克鲁格效应.png', 'e175a12bd626a97c5da9eb1080e394c3.png', '2020-10-26 18:58:33');
INSERT INTO `file` VALUES (34, 'vue不用index作为key原因1.png', 'f703ca55fe768cc7c861d4c73037b9d5.png', '2020-10-26 18:58:33');
INSERT INTO `file` VALUES (35, 'vue不用index作为key原因2.png', '382fe68dabe580b7a053f2423bdd9a80.png', '2020-10-26 18:58:33');
INSERT INTO `file` VALUES (36, 'vue异步更新.png', '3a420b52cb0ee68b7e666882938e8a01.png', '2020-10-26 18:58:33');

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
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of message
-- ----------------------------

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
INSERT INTO `user` VALUES (1, '韩畅畅', 'e10adc3949ba59abbe56e057f20f883e', 0, '15657122362', 'hcc96923@gmail.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '韩畅畅上传头像', 3);
INSERT INTO `user` VALUES (2, '曹青青', 'e10adc3949ba59abbe56e057f20f883e', 1, '15157122361', 'hcc96923@gmail.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1);
INSERT INTO `user` VALUES (3, '韩文龙', 'e10adc3949ba59abbe56e057f20f883e', 0, '15157122365', '734499162@qq.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1);
INSERT INTO `user` VALUES (4, '曹操', 'e10adc3949ba59abbe56e057f20f883e', 0, '15657122369', 'hcc96923@163.com', '2020-10-26 19:01:33', 'eae700998f461c56c59234648b2dd65e.png', '', 1);
INSERT INTO `user` VALUES (5, '刘备', 'e10adc3949ba59abbe56e057f20f883e', 0, '18147275149', '734499162@qq.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1);
INSERT INTO `user` VALUES (6, '孙权', 'e10adc3949ba59abbe56e057f20f883e', 0, '18147275149', 'hcc96923@gmail.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1);
INSERT INTO `user` VALUES (7, '诸葛亮', 'e10adc3949ba59abbe56e057f20f883e', 0, '15157122361', 'hcc96923@163.com', '2020-10-26 19:01:30', 'eae700998f461c56c59234648b2dd65e.png', '', 1);
INSERT INTO `user` VALUES (8, '貂蝉', 'e10adc3949ba59abbe56e057f20f883e', 1, '15657122362', '734499162@qq.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1);
INSERT INTO `user` VALUES (9, '大乔', 'e10adc3949ba59abbe56e057f20f883e', 1, '15657122362', 'hcc96923@gmail.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1);
INSERT INTO `user` VALUES (10, '小乔', 'e10adc3949ba59abbe56e057f20f883e', 1, '15657122369', 'hcc96923@163.com', '2020-10-26 19:01:29', 'eae700998f461c56c59234648b2dd65e.png', '', 1);
INSERT INTO `user` VALUES (11, '张飞', 'e10adc3949ba59abbe56e057f20f883e', 1, '15657122362', 'hcc96923@gmail.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1);
INSERT INTO `user` VALUES (12, '赵云', 'e10adc3949ba59abbe56e057f20f883e', 1, '18147275149', 'hcc96923@gmail.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1);
INSERT INTO `user` VALUES (13, '关羽', 'e10adc3949ba59abbe56e057f20f883e', 1, '15157122365', 'hcc96923@gmail.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1);
INSERT INTO `user` VALUES (14, '蔡夫人', 'e10adc3949ba59abbe56e057f20f883e', 0, '15657122362', 'hcc96923@gmail.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1);
INSERT INTO `user` VALUES (16, '静姝', 'e10adc3949ba59abbe56e057f20f883e', 0, '15157122361', 'hcc96923@gmail.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1);
INSERT INTO `user` VALUES (19, '古天乐', 'e10adc3949ba59abbe56e057f20f883e', 0, '15157122365', 'hcc96923@163.com', '2020-10-26 19:01:42', 'eae700998f461c56c59234648b2dd65e.png', '', 1);
INSERT INTO `user` VALUES (20, '刘青云', 'e10adc3949ba59abbe56e057f20f883e', 0, '18147275149', 'hcc96923@163.com', '2020-10-26 19:01:35', 'eae700998f461c56c59234648b2dd65e.png', '', 1);
INSERT INTO `user` VALUES (37, '张家辉', 'e10adc3949ba59abbe56e057f20f883e', 0, '15657122369', 'hcc96923@163.com', '2020-10-26 19:01:36', 'eae700998f461c56c59234648b2dd65e.png', '', 1);
INSERT INTO `user` VALUES (38, '三上悠亚', 'e10adc3949ba59abbe56e057f20f883e', 1, '15157122365', 'hcc96923@163.com', '2020-10-26 19:01:37', 'eae700998f461c56c59234648b2dd65e.png', '', 1);
INSERT INTO `user` VALUES (39, '王祖贤', 'e10adc3949ba59abbe56e057f20f883e', 0, '15157122365', 'hcc96923@163.com', '2020-10-26 19:01:47', 'eae700998f461c56c59234648b2dd65e.png', '', 1);
INSERT INTO `user` VALUES (40, '桥本有菜', 'e10adc3949ba59abbe56e057f20f883e', 1, '18147275149', 'hcc96923@163.com', '2020-10-26 19:01:40', 'eae700998f461c56c59234648b2dd65e.png', '', 3);

SET FOREIGN_KEY_CHECKS = 1;
