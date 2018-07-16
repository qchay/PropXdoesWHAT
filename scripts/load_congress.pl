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


#curl "https://api.propublica.org/congress/v1/115/house/members.json" -H "X-API-Key: SBIEp8AplypmmpUHdE8q8SWc7RGTujtgoKIZfOJj" > house_115.json
#curl "https://api.propublica.org/congress/v1/115/senate/members.json" -H "X-API-Key: SBIEp8AplypmmpUHdE8q8SWc7RGTujtgoKIZfOJj" > senate_115.json

for my $chamber ("house", "senate")
{
	print "processings ${chamber}...\n";
	my $json_in = decode_json(read_file("${chamber}_115.json"));
	my $list = $json_in->{"results"}->[0]->{"members"};


	my $db_handle = connect_to_db();
	my $insert_handle = $db_handle->prepare("INSERT INTO `politicians` (`first_name`, `last_name`, `dob`, `chamber`, `state`, `party`, `site`, `contact_form`,  `phone`, `bio_id`, `raw`) VALUES (?,?,?,?,?,?,?,?,?,?,?);");
		
	for (@{$list})
	{
		$insert_handle->execute($_->{"first_name"}, $_->{"last_name"}, $_->{"date_of_birth"}, $chamber, $_->{"state"}, $_->{"party"}, $_->{"url"}, $_->{"contact_form"}, $_->{"phone"}, $_->{"id"}, encode_json($_));
	}
	print "done\n";
}