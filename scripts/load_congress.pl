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
	my $settings	 = decode_json(read_file("db_info.json"));
	my $dsn 		 = "DBI:$settings->{db_driver}:database=$settings->{db_name};host=$settings->{db_host};";
	my $drh 		 = DBI->install_driver($settings->{'db_driver'});
	return DBI->connect($dsn, $settings->{'db_user'}, $settings->{'db_pass'}, $settings->{'db_extra'}) 
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