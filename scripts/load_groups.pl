use strict;
use DBI;
use DBD::mysql;
use File::Slurp;
use JSON;
use Data::Dumper;
use utf8;
use open ( ":encoding(UTF-8)", ":std" );

sub connect_to_db 
{
	my $databaseName = 'PropxdoeswhatDB';
	my $driver 		 = 'mysql';
	my $host 		 = 'propxdoeswhatdb.cnsfq0o1clx8.us-east-2.rds.amazonaws.com:3306';
	my $username 	 = 'Propxdoeswhat';
	my $password 	 = 'Propxdoeswhat';
	my $dsn 		 = "DBI:$driver:database=$databaseName;host=$host;";
	my $drh 		 = DBI->install_driver("$driver");
	return DBI->connect($dsn, $username, $password, {mysql_enable_utf8 => 1}) 
		or die "DB Connect error: $DBI::errstr";
}

my $groups = decode_json(read_file("groups_startguide.json"));

my $db_handle = connect_to_db();

my $insert_handle = $db_handle->prepare("INSERT INTO `action_groups` (`name`, `url`, `type`, `desc`) VALUES (?,?,?,?);");

for (@{$groups})
{
	$insert_handle->execute($_->{"name"}, $_->{"url"}, $_->{"type"}, $_->{"desc"});
}