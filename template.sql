/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1_3306
Source Server Version : 50723
Source Host           : 127.0.0.1:3306
Source Database       : tt

Target Server Type    : MYSQL
Target Server Version : 50723
File Encoding         : 65001

Date: 2019-04-01 16:35:56
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章标题',
  `click` int(11) NOT NULL DEFAULT '0' COMMENT '文章点击量',
  `desc` text COLLATE utf8mb4_unicode_ci COMMENT '文章描述',
  `keyword` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '文章关键字 '',''号隔开',
  `cover` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '封面',
  `top` tinyint(4) NOT NULL DEFAULT '0' COMMENT '文章置顶 0不置顶1置顶',
  `recommend` tinyint(4) NOT NULL DEFAULT '0' COMMENT '文章推荐 0不推荐 1推荐',
  `template_id` int(11) NOT NULL DEFAULT '1' COMMENT '文章模板ID,不填写为默认模板',
  `content` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章内容',
  `c_id` tinyint(4) NOT NULL COMMENT '文章分类Id',
  `user_id` int(11) NOT NULL COMMENT '文章发布者',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `author` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES ('4', '阿萨德', '6', '撒的', '阿萨德', '/storage/Jp1U4pqn8OoGHzfPABRNkpdqLqMMjTthvhlaw1V9.jpeg', '1', '1', '1', '<p>阿萨德暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖暖</p>', '2', '1', '2019-03-18 03:36:41', '2019-04-01 06:14:09', 'ALG', null);
INSERT INTO `articles` VALUES ('5', '啊实打实12321312', '51', '阿萨德阿萨德按时', '阿诗丹顿阿萨德', '/storage/a9roDdVEhaigpCmEpCk3DaLR6dOrZ0gp09zQf3Tt.jpeg', '1', '1', '1', '<p>啊实打实阿萨德</p>', '2', '1', '2019-03-18 03:55:07', '2019-04-01 06:12:51', 'ALG', null);
INSERT INTO `articles` VALUES ('6', '啊实打实12321312', '19', '阿萨德阿萨德按时', '阿诗丹顿阿萨德', '/storage/d6kLfMTKdkurUEzDajPAi9W0ZHx1DKCKhQGelyUV.jpeg', '1', '1', '1', '<p>啊实打实阿萨德f尽可能少的感觉看多看几个女生肯定就发给你就是你如果加上女方就可能就卡房管呢人家尽可能的风格不就看到刚拿到监控；发给你就看好你了；三条人命和能力但是繁华的街道；，发给，好；发，规划，风格化，。风格化，。；法国和老公很快乐就没考虑就很特殊的肌肤更不vas记得发v</p>', '3', '1', '2019-03-18 03:55:07', '2019-04-01 07:14:39', 'ALG', null);
INSERT INTO `articles` VALUES ('7', '啊实打实12321312', '8', '阿萨德阿萨德按时', '阿诗丹顿阿萨德', '/storage/lIfPRhO5hbLehimLOZXFMkzSjM8bWEBiby17R9ac.jpeg', '1', '1', '1', '<p>啊实打实阿萨德豆腐黄瓜烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦</p>', '3', '1', '2019-03-18 03:55:07', '2019-04-01 07:15:50', 'ALG', null);

-- ----------------------------
-- Table structure for authorities
-- ----------------------------
DROP TABLE IF EXISTS `authorities`;
CREATE TABLE `authorities` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `menu_id` int(11) NOT NULL COMMENT '所属菜单分类',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '权限名称',
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '权限描述',
  `keyword` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '权限标识',
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '类型：{0:接口,1:前端路由}',
  `default` tinyint(4) NOT NULL DEFAULT '0' COMMENT '类型：{0:不选中,1:默认选中,2:强制选中}',
  `extented` text COLLATE utf8mb4_unicode_ci COMMENT '权限扩展配置',
  `sort` smallint(6) NOT NULL DEFAULT '1000' COMMENT '排序',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of authorities
-- ----------------------------
INSERT INTO `authorities` VALUES ('1', '2', '菜单管理', '对菜单的所有权限控制', 'menu_all_controller', '1', '0', '{\"type\": true,\r\n                            \"data\": [{\r\n                                \"value\": \"add\",\r\n                                \"label\": \"添加\"\r\n                            }, {\r\n                                \"value\": \"edit\",\r\n                                \"label\": \"编辑\"\r\n                            }, {\r\n                                \"value\": \"delete\",\r\n                                \"label\": \"删除\"\r\n                            }]\r\n                        }', '1000', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `authorities` VALUES ('2', '4', '角色管理', '角色的全部控制权限', 'role_all_controller', '1', '0', '{\"type\": true,\r\n                            \"data\": [{\r\n                                \"value\": \"add\",\r\n                                \"label\": \"添加\"\r\n                            }, {\r\n                                \"value\": \"edit\",\r\n                                \"label\": \"编辑\"\r\n                            }, {\r\n                                \"value\": \"delete\",\r\n                                \"label\": \"删除\"\r\n                            }]\r\n                        }', '1000', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `authorities` VALUES ('3', '5', '用户管理', '用户的全部控制权限', 'user_all_controller', '1', '0', '{\"type\": true,\n                            \"data\": [{\n                                \"value\": \"add\",\n                                \"label\": \"添加\"\n                            }, {\n                                \"value\": \"edit\",\n                                \"label\": \"编辑\"\n                            }, {\n                                \"value\": \"delete\",\n                                \"label\": \"删除\"\n                            }, {\n                                \"value\": \"disable\",\n                                \"label\": \"禁用用户\"\n                            }, {\n                                \"value\": \"userGiveRole\",\n                                \"label\": \"给予用户权限\"\n                            }, {\n                                \"value\": \"editUserRole\",\n                                \"label\": \"编辑用户权限\"\n                            }]\n                        }', '1000', '2018-11-26 09:42:57', '2019-02-07 06:25:22');
INSERT INTO `authorities` VALUES ('4', '6', '权限管理', '权限的全部控制权限', 'auth_all_controller', '1', '0', '{\"type\": true,\r\n                            \"data\": [{\r\n                                \"value\": \"add\",\r\n                                \"label\": \"添加\"\r\n                            }, {\r\n                                \"value\": \"edit\",\r\n                                \"label\": \"编辑\"\r\n                            }, {\r\n                                \"value\": \"delete\",\r\n                                \"label\": \"删除\"\r\n                            }]\r\n                        }', '1000', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `authorities` VALUES ('5', '8', '内容管理', '文章的全部控制权限', 'article_all_controller', '1', '0', '{\"type\": true,\n                            \"data\": [{\n                                \"value\": \"add\",\n                                \"label\": \"添加\"\n                            }, {\n                                \"value\": \"edit\",\n                                \"label\": \"编辑\"\n                            }, {\n                                \"value\": \"delete\",\n                                \"label\": \"删除\"\n                            }, {\n                                \"value\": \"url\",\n                                \"label\": \"文章链接\"\n                            }]\n                        }', '1000', '2018-11-26 09:42:57', '2019-02-12 06:07:07');
INSERT INTO `authorities` VALUES ('6', '9', '内容回收', '文章回收站的全部控制权限', 'recovery_all_controller', '1', '0', '{\"type\": true,\n                            \"data\": [{\n                                \"value\": \"recovery\",\n                                \"label\": \"文章回收\"\n                            }, {\n                                \"value\": \"delete\",\n                                \"label\": \"删除\"\n                            }]\n                        }', '1000', '2018-11-26 09:42:57', '2019-03-18 06:06:10');
INSERT INTO `authorities` VALUES ('8', '11', '文章发布视图的控制权限', '文章发布视图的控制权限', 'publish_article_all_controller', '1', '0', null, '1000', '2018-11-26 09:42:57', '2019-02-07 07:43:20');
INSERT INTO `authorities` VALUES ('23', '32', '系统配置', '系统配置控制权限', 'system_control', '1', '0', null, '1000', '2019-02-07 06:43:11', '2019-02-07 06:43:11');
INSERT INTO `authorities` VALUES ('24', '33', '文章编辑', '文章编辑权限', 'edit_articles_control', '1', '0', null, '1000', '2019-02-07 07:48:27', '2019-02-07 07:48:27');
INSERT INTO `authorities` VALUES ('28', '36', '模板管理', '模板管理的全部权限', '/template_controller', '1', '0', '{\"type\": true,\n                            \"data\": [{\n                                \"value\": \"add\",\n                                \"label\": \"添加\"\n                            }, {\n                                \"value\": \"edit\",\n                                \"label\": \"编辑\"\n                            }, {\n                                \"value\": \"delete\",\n                                \"label\": \"删除\"\n                            }]\n                        }', '1000', '2019-03-18 01:23:29', '2019-03-18 01:23:29');
INSERT INTO `authorities` VALUES ('29', '37', '文章分类', '文章分类权限控制', 'category_controller', '1', '0', null, '1000', '2019-03-18 03:57:33', '2019-03-18 03:57:33');
INSERT INTO `authorities` VALUES ('30', '39', '网站SEO', '网站SEO权限管理', 'seo_controller', '1', '0', '{\"type\": true,\n                            \"data\": [{\n                                \"value\": \"add\",\n                                \"label\": \"添加\"\n                            }, {\n                                \"value\": \"edit\",\n                                \"label\": \"编辑\"\n                            }, {\n                                \"value\": \"delete\",\n                                \"label\": \"删除\"\n                            }]\n                        }', '1000', '2019-03-18 06:14:18', '2019-03-18 06:14:18');
INSERT INTO `authorities` VALUES ('31', '41', '网站导航', '网站导航权限管理', 'nav_controller', '1', '0', '{\"type\": true,\n                            \"data\": [{\n                                \"value\": \"add\",\n                                \"label\": \"添加\"\n                            }, {\n                                \"value\": \"edit\",\n                                \"label\": \"编辑\"\n                            }, {\n                                \"value\": \"delete\",\n                                \"label\": \"删除\"\n                            }]\n                        }', '1000', '2019-03-18 06:14:37', '2019-03-18 06:14:37');
INSERT INTO `authorities` VALUES ('32', '42', '友情链接', '友情链接权限管理', 'friend_controller', '1', '0', '{\"type\": true,\n                            \"data\": [{\n                                \"value\": \"add\",\n                                \"label\": \"添加\"\n                            }, {\n                                \"value\": \"edit\",\n                                \"label\": \"编辑\"\n                            }, {\n                                \"value\": \"delete\",\n                                \"label\": \"删除\"\n                            }]\n                        }', '1000', '2019-03-18 06:15:26', '2019-03-18 06:15:26');
INSERT INTO `authorities` VALUES ('33', '43', '网站信息', '网站信息权限管理', 'site_controller', '1', '0', '{\"type\": true,\n                            \"data\": [{\n                                \"value\": \"add\",\n                                \"label\": \"添加\"\n                            }, {\n                                \"value\": \"edit\",\n                                \"label\": \"编辑\"\n                            }, {\n                                \"value\": \"delete\",\n                                \"label\": \"删除\"\n                            }]\n                        }', '1000', '2019-03-18 06:15:57', '2019-03-18 06:15:57');

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分类名称',
  `pid` int(11) NOT NULL COMMENT '父类Id',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES ('1', '新闻资讯', '0', '2019-03-18 10:45:11', '2019-03-18 10:45:14');
INSERT INTO `categories` VALUES ('2', '行业动态', '1', '2019-03-18 10:45:24', '2019-03-18 10:45:25');
INSERT INTO `categories` VALUES ('3', '本地资讯', '1', '2019-03-28 10:48:45', '2019-04-01 07:37:44');

-- ----------------------------
-- Table structure for config
-- ----------------------------
DROP TABLE IF EXISTS `config`;
CREATE TABLE `config` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL COMMENT '父id',
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '类型',
  `keyword` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '关键字',
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '配置项',
  `desc` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '名称',
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of config
-- ----------------------------
INSERT INTO `config` VALUES ('1', '0', 'json', 'admin_base', '{\"article_total\":0,\"pv\":96,\"search\":0,\"submit\":7,\"monday\":101,\"tuesday\":0,\"wednesday\":0,\"thursday\":2,\"friday\":0,\"saturday\":0,\"sunday\":0}', '后台首页配置项', '1');
INSERT INTO `config` VALUES ('2', '0', 'json', 'sitebase', '{\"site_name\":\"\\u4e50\\u6613\\u77e5\\u4ea7\",\"icp\":\"\\u8700ICP\\u590718024407\\u53f7-3\",\"qq\":\"2052728227\",\"phone\":\"17323057831\",\"tel\":\"17323057831\",\"keyword\":\"sitebase\",\"items\":[{\"address\":\"\\u6210\\u90fd\\u5e02\\u6b66\\u4faf\\u533a\\u7ea2\\u724c\\u697c\\u5e7f\\u573a2\\u53f7\\u5199\\u5b57\\u697c601\\u5ba4\",\"tel\":null,\"index\":2,\"status\":1}],\"site_keyword\":\"1234\",\"desc\":\"1234\",\"postNum\":\"610000\",\"jsSlot\":[{\"code\":\"<scritp>console.log(\'\\u56db\\u5ddd\\u732a\\u592a\\u5e05\\u79d1\\u6280\')<\\/scritp>\"},{\"code\":\"<scritp>console.log(\'\\u56db\\u5ddd\\u732a\\u592a\\u5e05\\u79d1\\u6280\')<\\/scritp>\"}],\"email\":\"513051043@qq.com\"}', '没有描述', '1');
INSERT INTO `config` VALUES ('3', '0', 'json', 'point', '{\"english\":\"PRODUCT HIGHLIGHTS\",\"title\":\"\\u4ea7\\u54c1\\u4eae\\u70b9\",\"desc\":\"\\u6211\\u4eec\\u4e13\\u6ce8\\u4e8e\\u4e2d\\u4ecb\\u516c\\u53f8\\u5de5\\u4f5c\\u6d41\\u7a0b\\u7684\\u7ba1\\u7406,\\u6211\\u4eec\\u662f\\u8ffd\\u6c42\\u5b8c\\u7f8e\\u7684\\u6280\\u672f\\u6d41\\u6d3e,\\u6211\\u4eec\\u662f\\\"\\u6210\\u719f\\u7ba1\\u7406\\\" \\u7684\\u521b\\u9020\\u8005,\\u6211\\u4eec\\u62e5\\u6709.....\",\"keyword\":\"point\",\"items\":[{\"index\":1,\"address\":\"\\u5168\\u5c40\\u6027\",\"tel\":\"\\u7b80\\u5316\\u6d41\\u7a0b\\u4e36\\u5168\\u5c40\\u638c\\u63a7\",\"status\":1,\"title\":\"\\u7075\\u6d3b\\u6027\",\"desc\":\"\\u7b80\\u5316\\u6d41\\u7a0b\\uff0c\\u5168\\u5c40\\u638c\\u63a7\"},{\"address\":\"\\u667a\\u80fd\\u6027\",\"tel\":\"\\u6ce8\\u91cd\\u529f\\u80fd\\u4e36\\u4e00\\u952e\\u6392\\u8bc1\",\"index\":2,\"status\":1,\"title\":\"\\u8fde\\u901a\\u6027\",\"desc\":\"\\u4fe1\\u606f\\u5173\\u8054\\u3001\\u4e00\\u952e\\u6392\\u8bc1\"},{\"address\":\"\\u79d1\\u5b66\\u6027\",\"tel\":\"\\u8d44\\u6e90\\u6570\\u636e\\u5316\\u4e36\\u4fe1\\u606f\\u5316\",\"index\":3,\"status\":1,\"title\":\"\\u79d1\\u5b66\\u6027\",\"desc\":\"\\u8d44\\u6e90\\u6570\\u636e\\u5316\\u3001\\u4fe1\\u606f\\u5316\"},{\"address\":\"\\u6613\\u7528\\u6027\",\"tel\":\"\\u64cd\\u4f5c\\u7b80\\u5355\\u4e0a\\u624b\\u5feb\",\"index\":4,\"status\":1,\"title\":\"\\u6570\\u5b57\\u5316\",\"desc\":\"\\u591a\\u7ef4\\u5ea6\\u6570\\u636e\\u56fe\\u3001\\u62a5\\u8868\"},{\"address\":\"\\u53ef\\u89c6\\u5316\",\"tel\":\"\\u591a\\u7ef4\\u5ea6\\u6570\\u636e\\u56fe\\u8868\\u5c55\\u73b0\",\"index\":5,\"status\":1,\"title\":\"\\u4e13\\u4e1a\\u6027\",\"desc\":\"\\u5ba2\\u6237\\u4fe1\\u606f\\u8d44\\u6599\\u8be6\\u5c3d\\u8bb0\\u5f55\"}]}', '没有描述', '1');
INSERT INTO `config` VALUES ('4', '0', 'json', 'henhen', '{\"english\":\"HENG HENG OA\",\"title\":\"\\u54fc\\u54fc\\u529e\\u516c\",\"content\":\"<p style=\\\"margin: 10px 0px 0px; padding: 0px; background: rgb(255, 255, 255); text-indent: 2em; line-height: 3em;\\\"><span style=\\\"color: rgb(47, 47, 47); letter-spacing: 0px; font-size: 16px; font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;\\\">\\u54fc\\u54fc\\u529e\\u516c\\u662f\\u7531\\u56db\\u5ddd\\u732a\\u592a\\u5e05\\u79d1\\u6280\\u6709\\u9650\\u516c\\u53f8\\u81ea\\u4e3b\\u7814\\u53d1\\u5e76\\u8fd0\\u8425\\u7684\\u6838\\u5fc3\\u4ea7\\u54c1\\uff0c\\u610f\\u5728\\u4e3a\\u5efa\\u7b51\\u4e2d\\u4ecb\\u4f01\\u4e1a\\u63d0\\u4f9b\\u9ad8\\u6548\\u4fbf\\u5229\\u7684\\u6280\\u672f\\u670d\\u52a1\\u3002\\u4ea7\\u54c1\\u878d\\u5165\\u79d1\\u5b66\\u7684\\u7ba1\\u7406\\u601d\\u60f3\\u3001\\u7ba1\\u7406\\u6a21\\u5f0f\\uff0c\\u7ed3\\u5408\\u5148\\u8fdb\\u7684\\u8f6f\\u4ef6\\u6280\\u672f\\u3001\\u7f51\\u7edc\\u6280\\u672f\\uff0c\\u4e3a\\u7528\\u6237\\u63d0\\u4f9b\\u4e86\\u4f4e\\u6210\\u672c\\u3001\\u9ad8\\u6548\\u80fd\\u7684\\u534f\\u540c\\u529e\\u516c\\u548c\\u7ba1\\u7406\\u5e73\\u53f0\\u3002<\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; padding: 0px; background: rgb(255, 255, 255); text-indent: 2em; line-height: 3em;\\\"><span style=\\\"color: rgb(47, 47, 47); letter-spacing: 0px; font-size: 16px; font-family: \\u5b8b\\u4f53, SimSun;\\\">&nbsp;<\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; padding: 0px; background: rgb(255, 255, 255); text-indent: 2em; line-height: 3em;\\\"><span style=\\\"color: rgb(47, 47, 47); letter-spacing: 0px; font-size: 16px; font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;\\\">\\u54fc\\u54fc\\u529e\\u516c\\uff0c\\u5e2e\\u52a9\\u4f01\\u4e1a\\u89c4\\u8303\\u5de5\\u4f5c\\u6d41\\u7a0b\\u3001\\u5f3a\\u5316\\u56e2\\u961f\\u6267\\u884c\\u3001\\u63a8\\u52a8\\u7cbe\\u7ec6\\u7ba1\\u7406\\u3001\\u4fc3\\u8fdb\\u4f01\\u4e1a\\u8425\\u4e1a\\u589e\\u957f\\u3002<\\/span><\\/p><p><br\\/><\\/p>\",\"keyword\":\"henhen\",\"desc\":\"\\u54fc\\u54fc\\u529e\\u516c\\u662f\\u7531\\u56db\\u5ddd\\u732a\\u592a\\u5e05\\u79d1\\u6280\\u6709\\u9650\\u516c\\u53f8\\u81ea\\u4e3b\\u7814\\u53d1\\u5e76\\u8fd0\\u8425\\u7684\\u6838\\u5fc3\\u4ea7\\u54c1\\uff0c\\u610f\\u5728\\u4e3a\\u5efa\\u7b51\\u4e2d\\u4ecb\\u4f01\\u4e1a\\u63d0\\u4f9b\\u9ad8\\u6548\\u4fbf\\u5229\\u7684\\u6280\\u672f\\u670d\\u52a1\\u3002\\u4ea7\\u54c1\\u878d\\u5165\\u79d1\\u5b66\\u7684\\u7ba1\\u7406\\u601d\\u60f3\\u3001\\u7ba1\\u7406\\u6a21\\u5f0f\\uff0c\\u7ed3\\u5408\\u5148\\u8fdb\\u7684\\u8f6f\\u4ef6\\u6280\\u672f\\u3001\\u7f51\\u7edc\\u6280\\u672f\\uff0c\\u4e3a\\u7528\\u6237\\u63d0\\u4f9b\\u4e86\\u4f4e\\u6210\\u672c\\u3001\\u9ad8\\u6548\\u80fd\\u7684\\u534f\\u540c\\u529e\\u516c\\u548c\\u7ba1\\u7406\\u5e73\\u53f0\\u3002     \\u54fc\\u54fc\\u529e\\u516c\\uff0c\\u5e2e\\u52a9\\u4f01\\u4e1a\\u89c4\\u8303\\u5de5\\u4f5c\\u6d41\\u7a0b\\u3001\\u5f3a\\u5316\\u56e2\\u961f\\u6267\\u884c\\u3001\\u63a8\\u52a8\\u7cbe\\u7ec6\\u7ba1\\u7406\\u3001\\u4fc3\\u8fdb\\u4f01\\u4e1a\\u8425\\u4e1a\\u589e\\u957f\\u3002\"}', '没有描述', '1');
INSERT INTO `config` VALUES ('5', '0', 'json', 'company', '{\"english\":\"COMPANY INTRODUCTION\",\"title\":\"\\u516c\\u53f8\\u4ecb\\u7ecd\",\"content\":\"<p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\"><span style=\\\"font-family:\\u5fae\\u8f6f\\u96c5\\u9ed1\\\">\\u56db\\u5ddd\\u732a\\u592a\\u5e05\\u79d1\\u6280\\u6709\\u9650\\u516c\\u53f8\\u4f5c\\u4e3a\\u4e00\\u5bb6\\u4e92\\u8054\\u7f51\\u79d1\\u6280\\u516c\\u53f8\\uff0c\\u4e3b\\u8981\\u4e1a\\u52a1\\u5305\\u62ec\\uff1a\\u4e92\\u8054\\u7f51\\u5efa\\u8bbe\\u4e36\\u7535\\u5b50\\u5546\\u52a1\\u4e36\\u4f01\\u4e1a\\u54a8\\u8be2\\u4e36\\u8f6f\\u4ef6\\u7ba1\\u7406\\u7cfb\\u7edf\\u5f00\\u53d1<\\/span> <span style=\\\"font-family:\\u5fae\\u8f6f\\u96c5\\u9ed1\\\">\\u3002<\\/span><\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\">&nbsp;<\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\"><span style=\\\"font-family:\\u5fae\\u8f6f\\u96c5\\u9ed1\\\">\\u516c\\u53f8\\u521b\\u59cb\\u4eba\\u624e\\u6839\\u4e8e\\u5efa\\u7b51\\u884c\\u4e1a\\u591a\\u5e74\\uff0c\\u6df1\\u77e5\\u5efa\\u7b51\\u884c\\u4e1a<\\/span>\\u201c\\u75db\\u70b9\\u201d\\uff0c\\u5728\\u79fb\\u52a8\\u4e92\\u8054\\u7f51\\u7684\\u5927\\u6f6e\\u4e0b\\uff0c\\u732a\\u592a\\u5e05\\u53d1\\u5e03\\u4e86\\u4ee5\\u201c\\u667a\\u80fd\\u5316\\u3001\\u6d41\\u7a0b\\u5316\\u3001\\u5e73\\u53f0\\u5316\\u3001\\u6570\\u636e\\u5316\\u201d\\u56db\\u5316\\u4e3a\\u6838\\u5fc3\\u7684\\u7cfb\\u5217\\u4ea7\\u54c1\\uff0c\\u5305\\u62ec\\u9762\\u5411\\u4e2d\\u5c0f\\u578b\\u5efa\\u7b51\\u4e2d\\u4ecb\\u4f01\\u4e1a\\u7684\\u529e\\u516c\\u4ea7\\u54c1\\u2014\\u2014\\u54fc\\u54fc\\u529e\\u516c\\uff0c\\u4ee5\\u53ca\\u5e2e\\u52a9\\u5efa\\u7b51\\u4f01\\u4e1a\\u7ba1\\u7406\\u9879\\u76ee\\u3001\\u8bc1\\u4e66\\u3001\\u4eba\\u5458\\u7684\\u5e94\\u7528\\u578b\\u4ea7\\u54c1\\u2014\\u2014\\u5efa\\u7b51\\u4eba\\u7ba1\\u7406\\u7cfb\\u7edf\\u3002<\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\"><\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">\\u56db\\u5ddd\\u732a\\u592a\\u5e05\\u79d1\\u6280\\u6709\\u9650\\u516c\\u53f8\\u4f5c\\u4e3a\\u4e00\\u5bb6\\u4e92\\u8054\\u7f51\\u79d1\\u6280\\u516c\\u53f8\\uff0c\\u4e3b\\u8981\\u4e1a\\u52a1\\u5305\\u62ec\\uff1a\\u4e92\\u8054\\u7f51\\u5efa\\u8bbe\\u4e36\\u7535\\u5b50\\u5546\\u52a1\\u4e36\\u4f01\\u4e1a\\u54a8\\u8be2\\u4e36\\u8f6f\\u4ef6\\u7ba1\\u7406\\u7cfb\\u7edf\\u5f00\\u53d1&nbsp;\\u3002<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">&nbsp;<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">\\u516c\\u53f8\\u521b\\u59cb\\u4eba\\u624e\\u6839\\u4e8e\\u5efa\\u7b51\\u884c\\u4e1a\\u591a\\u5e74\\uff0c\\u6df1\\u77e5\\u5efa\\u7b51\\u884c\\u4e1a\\u201c\\u75db\\u70b9\\u201d\\uff0c\\u5728\\u79fb\\u52a8\\u4e92\\u8054\\u7f51\\u7684\\u5927\\u6f6e\\u4e0b\\uff0c\\u732a\\u592a\\u5e05\\u53d1\\u5e03\\u4e86\\u4ee5\\u201c\\u667a\\u80fd\\u5316\\u3001\\u6d41\\u7a0b\\u5316\\u3001\\u5e73\\u53f0\\u5316\\u3001\\u6570\\u636e\\u5316\\u201d\\u56db\\u5316\\u4e3a\\u6838\\u5fc3\\u7684\\u7cfb\\u5217\\u4ea7\\u54c1\\uff0c\\u5305\\u62ec\\u9762\\u5411\\u4e2d\\u5c0f\\u578b\\u5efa\\u7b51\\u4e2d\\u4ecb\\u4f01\\u4e1a\\u7684\\u529e\\u516c\\u4ea7\\u54c1\\u2014\\u2014\\u54fc\\u54fc\\u529e\\u516c\\uff0c\\u4ee5\\u53ca\\u5e2e\\u52a9\\u5efa\\u7b51\\u4f01\\u4e1a\\u7ba1\\u7406\\u9879\\u76ee\\u3001\\u8bc1\\u4e66\\u3001\\u4eba\\u5458\\u7684\\u5e94\\u7528\\u578b\\u4ea7\\u54c1\\u2014\\u2014\\u5efa\\u7b51\\u4eba\\u7ba1\\u7406\\u7cfb\\u7edf\\u3002<\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\"><br\\/><\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\"><\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">\\u56db\\u5ddd\\u732a\\u592a\\u5e05\\u79d1\\u6280\\u6709\\u9650\\u516c\\u53f8\\u4f5c\\u4e3a\\u4e00\\u5bb6\\u4e92\\u8054\\u7f51\\u79d1\\u6280\\u516c\\u53f8\\uff0c\\u4e3b\\u8981\\u4e1a\\u52a1\\u5305\\u62ec\\uff1a\\u4e92\\u8054\\u7f51\\u5efa\\u8bbe\\u4e36\\u7535\\u5b50\\u5546\\u52a1\\u4e36\\u4f01\\u4e1a\\u54a8\\u8be2\\u4e36\\u8f6f\\u4ef6\\u7ba1\\u7406\\u7cfb\\u7edf\\u5f00\\u53d1&nbsp;\\u3002<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">&nbsp;<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">\\u516c\\u53f8\\u521b\\u59cb\\u4eba\\u624e\\u6839\\u4e8e\\u5efa\\u7b51\\u884c\\u4e1a\\u591a\\u5e74\\uff0c\\u6df1\\u77e5\\u5efa\\u7b51\\u884c\\u4e1a\\u201c\\u75db\\u70b9\\u201d\\uff0c\\u5728\\u79fb\\u52a8\\u4e92\\u8054\\u7f51\\u7684\\u5927\\u6f6e\\u4e0b\\uff0c\\u732a\\u592a\\u5e05\\u53d1\\u5e03\\u4e86\\u4ee5\\u201c\\u667a\\u80fd\\u5316\\u3001\\u6d41\\u7a0b\\u5316\\u3001\\u5e73\\u53f0\\u5316\\u3001\\u6570\\u636e\\u5316\\u201d\\u56db\\u5316\\u4e3a\\u6838\\u5fc3\\u7684\\u7cfb\\u5217\\u4ea7\\u54c1\\uff0c\\u5305\\u62ec\\u9762\\u5411\\u4e2d\\u5c0f\\u578b\\u5efa\\u7b51\\u4e2d\\u4ecb\\u4f01\\u4e1a\\u7684\\u529e\\u516c\\u4ea7\\u54c1\\u2014\\u2014\\u54fc\\u54fc\\u529e\\u516c\\uff0c\\u4ee5\\u53ca\\u5e2e\\u52a9\\u5efa\\u7b51\\u4f01\\u4e1a\\u7ba1\\u7406\\u9879\\u76ee\\u3001\\u8bc1\\u4e66\\u3001\\u4eba\\u5458\\u7684\\u5e94\\u7528\\u578b\\u4ea7\\u54c1\\u2014\\u2014\\u5efa\\u7b51\\u4eba\\u7ba1\\u7406\\u7cfb\\u7edf\\u3002<\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\"><br\\/><\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\"><\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">\\u56db\\u5ddd\\u732a\\u592a\\u5e05\\u79d1\\u6280\\u6709\\u9650\\u516c\\u53f8\\u4f5c\\u4e3a\\u4e00\\u5bb6\\u4e92\\u8054\\u7f51\\u79d1\\u6280\\u516c\\u53f8\\uff0c\\u4e3b\\u8981\\u4e1a\\u52a1\\u5305\\u62ec\\uff1a\\u4e92\\u8054\\u7f51\\u5efa\\u8bbe\\u4e36\\u7535\\u5b50\\u5546\\u52a1\\u4e36\\u4f01\\u4e1a\\u54a8\\u8be2\\u4e36\\u8f6f\\u4ef6\\u7ba1\\u7406\\u7cfb\\u7edf\\u5f00\\u53d1&nbsp;\\u3002<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">&nbsp;<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">\\u516c\\u53f8\\u521b\\u59cb\\u4eba\\u624e\\u6839\\u4e8e\\u5efa\\u7b51\\u884c\\u4e1a\\u591a\\u5e74\\uff0c\\u6df1\\u77e5\\u5efa\\u7b51\\u884c\\u4e1a\\u201c\\u75db\\u70b9\\u201d\\uff0c\\u5728\\u79fb\\u52a8\\u4e92\\u8054\\u7f51\\u7684\\u5927\\u6f6e\\u4e0b\\uff0c\\u732a\\u592a\\u5e05\\u53d1\\u5e03\\u4e86\\u4ee5\\u201c\\u667a\\u80fd\\u5316\\u3001\\u6d41\\u7a0b\\u5316\\u3001\\u5e73\\u53f0\\u5316\\u3001\\u6570\\u636e\\u5316\\u201d\\u56db\\u5316\\u4e3a\\u6838\\u5fc3\\u7684\\u7cfb\\u5217\\u4ea7\\u54c1\\uff0c\\u5305\\u62ec\\u9762\\u5411\\u4e2d\\u5c0f\\u578b\\u5efa\\u7b51\\u4e2d\\u4ecb\\u4f01\\u4e1a\\u7684\\u529e\\u516c\\u4ea7\\u54c1\\u2014\\u2014\\u54fc\\u54fc\\u529e\\u516c\\uff0c\\u4ee5\\u53ca\\u5e2e\\u52a9\\u5efa\\u7b51\\u4f01\\u4e1a\\u7ba1\\u7406\\u9879\\u76ee\\u3001\\u8bc1\\u4e66\\u3001\\u4eba\\u5458\\u7684\\u5e94\\u7528\\u578b\\u4ea7\\u54c1\\u2014\\u2014\\u5efa\\u7b51\\u4eba\\u7ba1\\u7406\\u7cfb\\u7edf\\u3002<\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\"><br\\/><\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\"><\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">\\u56db\\u5ddd\\u732a\\u592a\\u5e05\\u79d1\\u6280\\u6709\\u9650\\u516c\\u53f8\\u4f5c\\u4e3a\\u4e00\\u5bb6\\u4e92\\u8054\\u7f51\\u79d1\\u6280\\u516c\\u53f8\\uff0c\\u4e3b\\u8981\\u4e1a\\u52a1\\u5305\\u62ec\\uff1a\\u4e92\\u8054\\u7f51\\u5efa\\u8bbe\\u4e36\\u7535\\u5b50\\u5546\\u52a1\\u4e36\\u4f01\\u4e1a\\u54a8\\u8be2\\u4e36\\u8f6f\\u4ef6\\u7ba1\\u7406\\u7cfb\\u7edf\\u5f00\\u53d1&nbsp;\\u3002<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">&nbsp;<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">\\u516c\\u53f8\\u521b\\u59cb\\u4eba\\u624e\\u6839\\u4e8e\\u5efa\\u7b51\\u884c\\u4e1a\\u591a\\u5e74\\uff0c\\u6df1\\u77e5\\u5efa\\u7b51\\u884c\\u4e1a\\u201c\\u75db\\u70b9\\u201d\\uff0c\\u5728\\u79fb\\u52a8\\u4e92\\u8054\\u7f51\\u7684\\u5927\\u6f6e\\u4e0b\\uff0c\\u732a\\u592a\\u5e05\\u53d1\\u5e03\\u4e86\\u4ee5\\u201c\\u667a\\u80fd\\u5316\\u3001\\u6d41\\u7a0b\\u5316\\u3001\\u5e73\\u53f0\\u5316\\u3001\\u6570\\u636e\\u5316\\u201d\\u56db\\u5316\\u4e3a\\u6838\\u5fc3\\u7684\\u7cfb\\u5217\\u4ea7\\u54c1\\uff0c\\u5305\\u62ec\\u9762\\u5411\\u4e2d\\u5c0f\\u578b\\u5efa\\u7b51\\u4e2d\\u4ecb\\u4f01\\u4e1a\\u7684\\u529e\\u516c\\u4ea7\\u54c1\\u2014\\u2014\\u54fc\\u54fc\\u529e\\u516c\\uff0c\\u4ee5\\u53ca\\u5e2e\\u52a9\\u5efa\\u7b51\\u4f01\\u4e1a\\u7ba1\\u7406\\u9879\\u76ee\\u3001\\u8bc1\\u4e66\\u3001\\u4eba\\u5458\\u7684\\u5e94\\u7528\\u578b\\u4ea7\\u54c1\\u2014\\u2014\\u5efa\\u7b51\\u4eba\\u7ba1\\u7406\\u7cfb\\u7edf\\u3002<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">\\u56db\\u5ddd\\u732a\\u592a\\u5e05\\u79d1\\u6280\\u6709\\u9650\\u516c\\u53f8\\u4f5c\\u4e3a\\u4e00\\u5bb6\\u4e92\\u8054\\u7f51\\u79d1\\u6280\\u516c\\u53f8\\uff0c\\u4e3b\\u8981\\u4e1a\\u52a1\\u5305\\u62ec\\uff1a\\u4e92\\u8054\\u7f51\\u5efa\\u8bbe\\u4e36\\u7535\\u5b50\\u5546\\u52a1\\u4e36\\u4f01\\u4e1a\\u54a8\\u8be2\\u4e36\\u8f6f\\u4ef6\\u7ba1\\u7406\\u7cfb\\u7edf\\u5f00\\u53d1&nbsp;\\u3002<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">&nbsp;<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">\\u516c\\u53f8\\u521b\\u59cb\\u4eba\\u624e\\u6839\\u4e8e\\u5efa\\u7b51\\u884c\\u4e1a\\u591a\\u5e74\\uff0c\\u6df1\\u77e5\\u5efa\\u7b51\\u884c\\u4e1a\\u201c\\u75db\\u70b9\\u201d\\uff0c\\u5728\\u79fb\\u52a8\\u4e92\\u8054\\u7f51\\u7684\\u5927\\u6f6e\\u4e0b\\uff0c\\u732a\\u592a\\u5e05\\u53d1\\u5e03\\u4e86\\u4ee5\\u201c\\u667a\\u80fd\\u5316\\u3001\\u6d41\\u7a0b\\u5316\\u3001\\u5e73\\u53f0\\u5316\\u3001\\u6570\\u636e\\u5316\\u201d\\u56db\\u5316\\u4e3a\\u6838\\u5fc3\\u7684\\u7cfb\\u5217\\u4ea7\\u54c1\\uff0c\\u5305\\u62ec\\u9762\\u5411\\u4e2d\\u5c0f\\u578b\\u5efa\\u7b51\\u4e2d\\u4ecb\\u4f01\\u4e1a\\u7684\\u529e\\u516c\\u4ea7\\u54c1\\u2014\\u2014\\u54fc\\u54fc\\u529e\\u516c\\uff0c\\u4ee5\\u53ca\\u5e2e\\u52a9\\u5efa\\u7b51\\u4f01\\u4e1a\\u7ba1\\u7406\\u9879\\u76ee\\u3001\\u8bc1\\u4e66\\u3001\\u4eba\\u5458\\u7684\\u5e94\\u7528\\u578b\\u4ea7\\u54c1\\u2014\\u2014\\u5efa\\u7b51\\u4eba\\u7ba1\\u7406\\u7cfb\\u7edf\\u3002<\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\"><br\\/><\\/span><br\\/><\\/p><p><br\\/><\\/p>\",\"keyword\":\"company\",\"desc\":\"\\u56db\\u5ddd\\u732a\\u592a\\u5e05\\u79d1\\u6280\\u6709\\u9650\\u516c\\u53f8\\u4f5c\\u4e3a\\u4e00\\u5bb6\\u4e92\\u8054\\u7f51\\u79d1\\u6280\\u516c\\u53f8\\uff0c\\u4e3b\\u8981\\u4e1a\\u52a1\\u5305\\u62ec\\uff1a\\u4e92\\u8054\\u7f51\\u5efa\\u8bbe\\u4e36\\u7535\\u5b50\\u5546\\u52a1\\u4e36\\u4f01\\u4e1a\\u54a8\\u8be2\\u4e36\\u8f6f\\u4ef6\\u7ba1\\u7406\\u7cfb\\u7edf\\u5f00\\u53d1 \\u3002     \\u516c\\u53f8\\u521b\\u59cb\\u4eba\\u624e\\u6839\\u4e8e\\u5efa\\u7b51\\u884c\\u4e1a\\u591a\\u5e74\\uff0c\\u6df1\\u77e5\\u5efa\\u7b51\\u884c\\u4e1a\\u201c\\u75db\\u70b9\\u201d\\uff0c\\u5728\\u79fb\\u52a8\\u4e92\\u8054\\u7f51\\u7684\\u5927\\u6f6e\\u4e0b\\uff0c\\u732a\\u592a\\u5e05\\u53d1\\u5e03\\u4e86\\u4ee5\\u201c\\u667a\\u80fd\\u5316\\u3001\\u6d41\\u7a0b\\u5316\\u3001\\u5e73\\u53f0\\u5316\\u3001\\u6570\\u636e\\u5316\\u201d\\u56db\\u5316\\u4e3a\\u6838\\u5fc3\\u7684\\u7cfb\\u5217\\u4ea7\\u54c1\\uff0c\\u5305\\u62ec\\u9762\\u5411\\u4e2d\\u5c0f\\u578b\\u5efa\\u7b51\\u4e2d\\u4ecb\\u4f01\\u4e1a\\u7684\\u529e\\u516c\\u4ea7\\u54c1\\u2014\\u2014\\u54fc\\u54fc\\u529e\\u516c\\uff0c\\u4ee5\\u53ca\\u5e2e\\u52a9\\u5efa\\u7b51\\u4f01\\u4e1a\\u7ba1\\u7406\\u9879\\u76ee\\u3001\\u8bc1\\u4e66\\u3001\\u4eba\\u5458\\u7684\\u5e94\\u7528\\u578b\\u4ea7\\u54c1\\u2014\\u2014\\u5efa\\u7b51\\u4eba\\u7ba1\\u7406\\u7cfb\\u7edf\\u3002\"}', '没有描述', '1');
INSERT INTO `config` VALUES ('7', '0', 'json', 'batchOrder', '{\"status\":\"0\",\"number\":\"6\"}', '防刷订单配置', '1');
INSERT INTO `config` VALUES ('8', '0', 'json', 'emailNotify', '{\"status\":\"1\",\"smtp_server\":\"smtp.qq.com\",\"smtp_port\":\"465\",\"smtp_user\":\"2475710452@qq.com\",\"smtp_password\":\"jlklhuxflbnqdjah\",\"email_title\":\"\\u4f60\\u597d\\u5440!\"}', '邮件消息通知配置', '1');
INSERT INTO `config` VALUES ('9', '0', 'json', 'phoneNotify', '{\"status\":\"1\",\"provider\":\"smsbao\",\"access_key_id\":\"wang223000\",\"secret\":\"935180069wang\",\"content\":\"\\u3010\\u5feb\\u4e50\\u8d2d\\u3011\\u60a8\\u597d!\\u60a8\\u8ba2\\u8d2d\\u7684{product} \\u8ba2\\u5355\\u63d0\\u4ea4\\u6210\\u529f,\\u8bf7\\u572815\\u5206\\u949f\\u5185\\u56de\\u590d\\u672c\\u77ed\\u4fe1,\\u786e\\u8ba4\\u8ba2\\u8d2d\\u8bf7\\u56de\\u590d1, \\u6211\\u4eec\\u4f1a\\u5c3d\\u5feb\\u5b89\\u6392\\u53d1\\u8d27\",\"sing_anme\":\"\\u5feb\\u4e50\\u8d2d\",\"TemplateCode\":\"SMS_157446831\"}', '手机短信通知配置', '1');
INSERT INTO `config` VALUES ('10', '0', 'json', 'wx', '{\"appid\":\"1123\",\"secret\":\"123\"}', '微信配置', null);
INSERT INTO `config` VALUES ('11', '0', 'json', 'wx', '{\"appid\":\"1123\",\"secret\":\"123\"}', '微信配置', null);
INSERT INTO `config` VALUES ('12', '0', 'json', 'wx', '{\"appid\":\"1123\",\"secret\":\"123\"}', '微信配置', null);
INSERT INTO `config` VALUES ('13', '0', 'json', 'about', '{\"content\":\"<p>\\u5173\\u4e8e\\u6211\\u4eec<\\/p>\"}', '关于我们', null);

-- ----------------------------
-- Table structure for contacts
-- ----------------------------
DROP TABLE IF EXISTS `contacts`;
CREATE TABLE `contacts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '联系人',
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '联系电话',
  `qq` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'QQ号码',
  `company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '公司名称',
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '留言内容',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注信息',
  `status` tinyint(4) NOT NULL COMMENT '处理状态',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of contacts
-- ----------------------------
INSERT INTO `contacts` VALUES ('1', '1', '1', '1', '1', '1', '1', '1', '2019-04-01 11:43:41', null);
INSERT INTO `contacts` VALUES ('2', 'chenying', '13880373665', '2303276504', 'dd', 'nnnnnnnn', null, '0', '2019-04-01 06:56:40', '2019-04-01 06:56:40');
INSERT INTO `contacts` VALUES ('3', 'chenying', '13880373665', '2303276504', 'dd', 'nnnnnn', null, '0', '2019-04-01 06:57:33', '2019-04-01 06:57:33');
INSERT INTO `contacts` VALUES ('4', 'chenying', '13880373665', '2303276504', '6666', 'nnnnnn', null, '0', '2019-04-01 06:57:45', '2019-04-01 06:57:45');
INSERT INTO `contacts` VALUES ('5', 'chenying', '555555555555555555555555555555', '2303276504', 'dd', 'nnnnnn', null, '0', '2019-04-01 06:58:42', '2019-04-01 06:58:42');
INSERT INTO `contacts` VALUES ('6', 'chenying', '13880373665', '2303276504', 'dd', 'bbbbbbbbbbbbbbb', null, '0', '2019-04-01 06:59:47', '2019-04-01 06:59:47');

-- ----------------------------
-- Table structure for friend_links
-- ----------------------------
DROP TABLE IF EXISTS `friend_links`;
CREATE TABLE `friend_links` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of friend_links
-- ----------------------------
INSERT INTO `friend_links` VALUES ('4', '同城咨询', 'http://www.5g.com.cn', '2019-03-18 07:13:17', '2019-03-18 07:13:17');

-- ----------------------------
-- Table structure for funs
-- ----------------------------
DROP TABLE IF EXISTS `funs`;
CREATE TABLE `funs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '功能介绍标题',
  `desc` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '功能介绍描述',
  `photos` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '功能介绍图片',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of funs
-- ----------------------------
INSERT INTO `funs` VALUES ('4', '发给对方', '单个', '[\"\\/storage\\/oo5ipKWuuZ9tVQcyALzYFDogEWm1BZE72frqR0ho.jpeg\"]', '2019-04-01 03:07:14', '2019-04-01 03:20:53');
INSERT INTO `funs` VALUES ('5', '阿萨德', '阿萨德', '[\"\\/storage\\/gKZPlXNhKjdQy5SKwsNMUVXTAHuDmjf1wjg9qOHK.jpeg\"]', '2019-04-01 03:08:34', '2019-04-01 03:20:56');

-- ----------------------------
-- Table structure for html_templates
-- ----------------------------
DROP TABLE IF EXISTS `html_templates`;
CREATE TABLE `html_templates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '模板名称',
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '模板路径',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of html_templates
-- ----------------------------
INSERT INTO `html_templates` VALUES ('1', '默认模板', 'goods/default/view');

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL DEFAULT '0' COMMENT '父级分类ID',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '菜单名',
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '菜单图标',
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '菜单链接',
  `sort` smallint(6) NOT NULL DEFAULT '1000' COMMENT '排序',
  `state` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态：{0：不显示，1：正常显示}',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES ('1', '0', '系统设置', 'el-icon-setting', null, '1000', '1', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `menus` VALUES ('2', '1', '菜单管理', null, '/menu', '1000', '1', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `menus` VALUES ('3', '0', '用户管理', 'el-icon-menu', null, '1000', '1', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `menus` VALUES ('4', '3', '角色管理', null, '/role', '1000', '1', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `menus` VALUES ('5', '3', '用户管理', null, '/user', '1000', '1', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `menus` VALUES ('6', '3', '权限管理', null, '/auth', '1000', '1', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `menus` VALUES ('7', '0', '内容管理', 'el-icon-location', null, '1000', '1', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `menus` VALUES ('8', '7', '文章列表', null, '/article_list', '1000', '1', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `menus` VALUES ('9', '7', '回收站', null, '/recovery', '1000', '1', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `menus` VALUES ('11', '7', '发布文章', null, '/publish_article', '1000', '1', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `menus` VALUES ('33', '7', '文章编辑', null, '/article_edit', '1000', '0', '2019-02-07 06:48:55', '2019-02-07 06:48:55');
INSERT INTO `menus` VALUES ('36', '7', '模板管理', null, '/template', '1000', '1', '2019-03-18 01:06:56', '2019-03-18 01:06:56');
INSERT INTO `menus` VALUES ('37', '7', '文章分类', null, '/category', '1000', '1', '2019-03-18 03:56:57', '2019-03-18 03:56:57');
INSERT INTO `menus` VALUES ('38', '0', '网站运营', 'el-icon-service', null, '1000', '1', '2019-03-18 06:07:54', '2019-03-18 06:07:54');
INSERT INTO `menus` VALUES ('39', '38', '网站SEO', null, '/seo', '1000', '1', '2019-03-18 06:08:08', '2019-03-18 06:08:08');
INSERT INTO `menus` VALUES ('41', '38', '网站导航', null, '/nav', '1000', '1', '2019-03-18 06:08:43', '2019-03-18 06:08:43');
INSERT INTO `menus` VALUES ('42', '38', '友情链接', null, '/friend_link', '1000', '1', '2019-03-18 06:09:04', '2019-03-18 06:09:04');
INSERT INTO `menus` VALUES ('43', '38', '网站信息', null, '/sitebase', '1000', '1', '2019-03-18 06:13:23', '2019-03-18 06:13:23');

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES ('1', '2014_10_12_100000_create_password_resets_table', '1');
INSERT INTO `migrations` VALUES ('8', '2018_08_27_071042_create_menus_table', '1');
INSERT INTO `migrations` VALUES ('9', '2018_08_28_060312_create_roles_table', '1');
INSERT INTO `migrations` VALUES ('10', '2018_08_28_060732_create_authorities_table', '1');
INSERT INTO `migrations` VALUES ('11', '2018_09_21_045401_create_role_and_auth_table', '1');
INSERT INTO `migrations` VALUES ('12', '2018_09_21_045431_create_user_and_role_table', '1');
INSERT INTO `migrations` VALUES ('13', '2018_10_22_063109_create_role_and_menu_table', '1');
INSERT INTO `migrations` VALUES ('16', '2018_11_26_032618_create_html_templates_table', '4');
INSERT INTO `migrations` VALUES ('18', '2018_09_17_071636_create_config_models_table', '6');
INSERT INTO `migrations` VALUES ('39', '2014_10_12_000000_create_users_table', '7');
INSERT INTO `migrations` VALUES ('40', '2019_03_18_013825_create_articles_table', '7');
INSERT INTO `migrations` VALUES ('41', '2019_03_18_021904_create_categories_table', '8');
INSERT INTO `migrations` VALUES ('42', '2019_03_18_063543_create_friend_links_table', '9');
INSERT INTO `migrations` VALUES ('43', '2019_03_18_063607_create_s_e_o_s_table', '9');
INSERT INTO `migrations` VALUES ('44', '2019_03_18_064523_create_navs_table', '9');
INSERT INTO `migrations` VALUES ('45', '2019_03_25_062204_create_partners_table', '10');
INSERT INTO `migrations` VALUES ('46', '2019_03_25_062448_create_team_imgs_table', '10');
INSERT INTO `migrations` VALUES ('47', '2019_03_25_075239_create_patents_table', '11');
INSERT INTO `migrations` VALUES ('48', '2019_03_25_075304_create_copy_rights_table', '11');
INSERT INTO `migrations` VALUES ('49', '2019_03_27_062424_create_innojoy_user_id_table', '12');
INSERT INTO `migrations` VALUES ('50', '2019_04_01_015018_create_funs_table', '13');
INSERT INTO `migrations` VALUES ('51', '2018_12_06_011225_create_contacts_table', '14');

-- ----------------------------
-- Table structure for navs
-- ----------------------------
DROP TABLE IF EXISTS `navs`;
CREATE TABLE `navs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '导航名称',
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '导航链接地址',
  `seo_id` int(11) DEFAULT NULL COMMENT '页面所使用的 seo信息',
  `nav_banner` text COLLATE utf8mb4_unicode_ci COMMENT '导航banner图片 {json格式}',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of navs
-- ----------------------------
INSERT INTO `navs` VALUES ('2', '首页', '/', '2', '[{\"banner_addr\":\"\\/storage\\/XvODDYCAJk9eHWramxlECbcUMK7N2luGPqkrE13l.jpeg\",\"alt\":\"\\u56fe\\u72471\",\"href\":\"http:\\/\\/www.leyi.com\"},{\"banner_addr\":\"\\/storage\\/ydqD9Q8WiQtzXxDQ55rl7qvaGKYaWBhRgzJUcYTE.jpeg\",\"alt\":\"\\u56fe\\u72472\",\"href\":\"http:\\/\\/www.leyi.com\"}]', '2019-03-18 07:06:04', '2019-03-28 02:24:19');
INSERT INTO `navs` VALUES ('8', '新闻咨询', '/news', '2', '[]', '2019-03-18 07:09:06', '2019-03-18 07:18:27');
INSERT INTO `navs` VALUES ('9', '关于我们', '/about', '2', '[]', '2019-03-18 07:09:30', '2019-03-18 07:18:31');
INSERT INTO `navs` VALUES ('10', '联系我们', '/contact', '2', '[]', '2019-03-29 06:33:26', '2019-03-29 06:33:26');

-- ----------------------------
-- Table structure for password_resets
-- ----------------------------
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of password_resets
-- ----------------------------

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色名称',
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '角色描述',
  `sort` smallint(6) NOT NULL DEFAULT '1000' COMMENT '排序',
  `state` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态：{0：禁用，1：正常}',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('1', '超管', '系统超级管理员默认拥有所有权限', '1000', '1', '2018-11-26 09:42:57', '2018-12-04 03:49:48');

-- ----------------------------
-- Table structure for role_and_auth
-- ----------------------------
DROP TABLE IF EXISTS `role_and_auth`;
CREATE TABLE `role_and_auth` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int(10) unsigned NOT NULL COMMENT '角色ID',
  `auth_id` int(10) unsigned NOT NULL COMMENT '权限ID',
  `extented` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '权限扩展配置',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `page` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '该权限是属于哪个菜单页面的',
  `state` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=168 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of role_and_auth
-- ----------------------------
INSERT INTO `role_and_auth` VALUES ('152', '1', '1', '[\"add\",\"edit\",\"delete\"]', null, null, 'menu', '1');
INSERT INTO `role_and_auth` VALUES ('153', '1', '2', '[\"add\",\"edit\",\"delete\"]', null, null, 'role', '1');
INSERT INTO `role_and_auth` VALUES ('154', '1', '3', '[\"add\",\"edit\",\"delete\",\"disable\",\"userGiveRole\",\"editUserRole\"]', null, null, 'user', '1');
INSERT INTO `role_and_auth` VALUES ('155', '1', '4', '[\"add\",\"edit\",\"delete\"]', null, null, 'auth', '1');
INSERT INTO `role_and_auth` VALUES ('156', '1', '5', '[\"add\",\"edit\",\"delete\"]', null, null, 'article_list', '1');
INSERT INTO `role_and_auth` VALUES ('157', '1', '6', '[\"recovery\",\"delete\"]', null, null, 'recovery', '1');
INSERT INTO `role_and_auth` VALUES ('158', '1', '8', '[]', null, null, 'publish_article', '1');
INSERT INTO `role_and_auth` VALUES ('159', '1', '24', '[]', null, null, 'article_edit', '1');
INSERT INTO `role_and_auth` VALUES ('160', '1', '28', '[\"add\",\"edit\",\"delete\"]', null, null, 'template', '1');
INSERT INTO `role_and_auth` VALUES ('161', '1', '29', '[]', null, null, 'category', '1');
INSERT INTO `role_and_auth` VALUES ('162', '1', '30', '[\"add\",\"edit\",\"delete\"]', null, null, 'seo', '1');
INSERT INTO `role_and_auth` VALUES ('163', '1', '31', '[\"add\",\"edit\",\"delete\"]', null, null, 'nav', '1');
INSERT INTO `role_and_auth` VALUES ('164', '1', '32', '[\"add\",\"edit\",\"delete\"]', null, null, 'friend_link', '1');
INSERT INTO `role_and_auth` VALUES ('165', '1', '33', '[\"add\",\"edit\",\"delete\"]', null, null, 'sitebase', '1');
INSERT INTO `role_and_auth` VALUES ('166', '1', '38', '[\"add\",\"edit\",\"delete\"]', null, null, 'fun', '1');
INSERT INTO `role_and_auth` VALUES ('167', '1', '39', '[\"add\",\"edit\",\"delete\"]', null, null, 'contact', '1');

-- ----------------------------
-- Table structure for s_e_o_s
-- ----------------------------
DROP TABLE IF EXISTS `s_e_o_s`;
CREATE TABLE `s_e_o_s` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `keywords` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '页面关键字',
  `desc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '页面关键字',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '页面标题',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of s_e_o_s
-- ----------------------------
INSERT INTO `s_e_o_s` VALUES ('2', '乐易知产', '【乐易知产】知识产权', '乐易知产', '新闻中心', '2019-03-18 06:52:50', '2019-03-18 07:11:55');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户密码',
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '手机号码',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '邮箱',
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户头像',
  `sex` tinyint(4) NOT NULL DEFAULT '0' COMMENT '用户性别:{0:未填写,1:男,2:女}',
  `state` tinyint(4) NOT NULL DEFAULT '1' COMMENT '用户状态：{0:禁用,1:正常}',
  `options` text COLLATE utf8mb4_unicode_ci COMMENT '个人信息配置',
  `token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户登录token',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_phone_unique` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'ALG', 'e10adc3949ba59abbe56e057f20f883e', '13686840083', '513051043@qq.com', '/storage/2Luwo0iBOQOTZUT0atdrAYPkelYd7sJRU4FgCA9U.png', '1', '1', null, 'bbac77b8b660fb1100720286a5cfd770e0061453', '2019-03-18 09:53:29', '2019-04-01 08:28:29', null);

-- ----------------------------
-- Table structure for user_and_role
-- ----------------------------
DROP TABLE IF EXISTS `user_and_role`;
CREATE TABLE `user_and_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int(10) unsigned NOT NULL COMMENT '角色ID',
  `user_id` int(10) unsigned NOT NULL COMMENT '用户ID',
  `role_name` int(11) DEFAULT NULL COMMENT '角色名称',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of user_and_role
-- ----------------------------
INSERT INTO `user_and_role` VALUES ('1', '1', '1', null, '2018-11-26 09:42:57', '2018-11-26 09:42:57');
