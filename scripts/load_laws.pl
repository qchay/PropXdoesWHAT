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

my $laws = decode_json(read_file("laws.json"));


my $db_handle = connect_to_db();

my $insert_handle = $db_handle->prepare("INSERT INTO `laws` (`bill_id`, `name`, `title`, `subject`, `sponsor_bio_id`, `cdotgov_url`, `govtrack_url`, `introduced`, `last_vote`, `house_pass`, `senate_pass`, `enacted`, `vetoed`, `desc`, `raw`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);");
	
for (@{$laws})
{
	$insert_handle->execute($_->{"bill_id"}, $_->{"number"}, $_->{"short_title"}, $_->{"primary_subject"}, $_->{"sponsor_id"}, $_->{"congressdotgov_url"}, $_->{"govtrack_url"}, $_->{"introduced_date"}, $_->{"last_vote"}, $_->{"house_passage"}, $_->{"senate_passage"}, $_->{"enacted"}, $_->{"vetoed"},  $_->{"summary"}, encode_json($_));
}

# update `laws` as l, `politicians` as p set l.`sponsor_id` = p.`id` where l.`sponsor_bio_id` = p.`bio_id`