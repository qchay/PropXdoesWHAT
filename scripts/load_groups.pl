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

my $groups = decode_json(read_file("groups_startguide.json"));

my $db_handle = connect_to_db();

my $insert_handle = $db_handle->prepare("INSERT INTO `action_groups` (`name`, `url`, `type`, `desc`) VALUES (?,?,?,?);");

for (@{$groups})
{
	$insert_handle->execute($_->{"name"}, $_->{"url"}, $_->{"type"}, $_->{"desc"});
}