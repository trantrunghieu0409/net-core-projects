CREATE DATABASE STUDENTSREDIS
GO

USE [STUDENTSREDIS]
GO
/****** Object:  Table [dbo].[Students]    Script Date: 5/31/2022 4:18:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Students](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](max) NOT NULL,
	[score] [int] NOT NULL,
 CONSTRAINT [PK_Students] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Students] ON 

INSERT [dbo].[Students] ([Id], [name], [score]) VALUES (1, N'Peter', 5)
INSERT [dbo].[Students] ([Id], [name], [score]) VALUES (2, N'David', 2)
INSERT [dbo].[Students] ([Id], [name], [score]) VALUES (3, N'Look', 3)
INSERT [dbo].[Students] ([Id], [name], [score]) VALUES (4, N'Law', 4)
INSERT [dbo].[Students] ([Id], [name], [score]) VALUES (5, N'Dobby', 6)
INSERT [dbo].[Students] ([Id], [name], [score]) VALUES (6, N'Parker', 8)
INSERT [dbo].[Students] ([Id], [name], [score]) VALUES (7, N'Jackson', 9)
INSERT [dbo].[Students] ([Id], [name], [score]) VALUES (8, N'Johnson', 10)
INSERT [dbo].[Students] ([Id], [name], [score]) VALUES (9, N'Thompson', 11)
SET IDENTITY_INSERT [dbo].[Students] OFF
GO
