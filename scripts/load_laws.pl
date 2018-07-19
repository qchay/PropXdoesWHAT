use strict;
use JSON;
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

my $laws = decode_json(read_file("laws.json"));


my $db_handle = connect_to_db();

my $insert_handle = $db_handle->prepare("INSERT INTO `laws` (`bill_id`, `name`, `title`, `subject`, `sponsor_bio_id`, `cdotgov_url`, `govtrack_url`, `introduced`, `last_vote`, `house_pass`, `senate_pass`, `enacted`, `vetoed`, `desc`, `raw`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);");
	
for (@{$laws})
{
	$insert_handle->execute($_->{"bill_id"}, $_->{"number"}, $_->{"short_title"}, $_->{"primary_subject"}, $_->{"sponsor_id"}, $_->{"congressdotgov_url"}, $_->{"govtrack_url"}, $_->{"introduced_date"}, $_->{"last_vote"}, $_->{"house_passage"}, $_->{"senate_passage"}, $_->{"enacted"}, $_->{"vetoed"},  $_->{"summary"}, encode_json($_));
}

# update `laws` as l, `politicians` as p set l.`sponsor_id` = p.`id` where l.`sponsor_bio_id` = p.`bio_id`