/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 50730
 Source Host           : localhost:3306
 Source Schema         : user

 Target Server Type    : MySQL
 Target Server Version : 50730
 File Encoding         : 65001

 Date: 08/10/2020 16:02:09
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
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES (1, 'Excel.xlsx', 'da2f7e7453ed086192f83350d7c87b21.xlsx', '2020-10-07 14:46:18');
INSERT INTO `file` VALUES (2, '54052873.jpg', '8fa0ce951d2ea34e99dcbb06c06b72fc.jpg', '2020-10-07 14:46:18');

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
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

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
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '韩畅畅', '123456', 0, '15657122362', 'hcc96923@gmail.com', '2020-10-07 11:48:38', 'cf2aa5a0d9a535fb8bf6c94d863ae439.jpg', '韩畅畅上传头像', 3);
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
INSERT INTO `user` VALUES (15, '吴国太', '123456', 0, '15157122361', 'hcc96923@gmail.com', '2020-09-18 18:30:49', '', '', 1);
INSERT INTO `user` VALUES (16, '静姝', '123456', 0, '15157122361', 'hcc96923@gmail.com', '2020-09-18 18:30:41', '', '', 1);
INSERT INTO `user` VALUES (19, '古天乐', '123456', 0, '15157122365', '123456@163.com', '2020-09-18 18:31:02', '', '', 1);
INSERT INTO `user` VALUES (20, '刘青云', '123456', 0, '18147275149', '19898@qq.com', '2020-09-18 18:30:59', '', '', 1);
INSERT INTO `user` VALUES (37, '张家辉', '123456', 0, '15657122369', '19898@qq.com', '2020-09-18 18:30:56', '', '', 1);
INSERT INTO `user` VALUES (38, '都是非常的撒擦', '123456', 0, '15157122365', '19898@qq.com', '2020-09-18 18:31:05', '', '', 1);
INSERT INTO `user` VALUES (39, '王祖贤', '147258', 0, '', '', '2020-10-08 15:47:14', '170ae6b552dee8bd5ddd0752dc862415.jpg_b', '', 1);

SET FOREIGN_KEY_CHECKS = 1;
