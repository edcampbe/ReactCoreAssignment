create table dbo.Players(
PlayerId int identity(1,1),
PlayerName varchar(149),
PlayerOrg varchar(149),
ContractStartDate date,
ContractEndDate date,
PhotoFileName varchar(149)
);