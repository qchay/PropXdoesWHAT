use strict;
use DBI;
use DBD::mysql;
use File::Slurp;
use JSON;
use Data::Dumper;
use utf8;
use open ( ":encoding(UTF-8)", ":std" );
use LWP::UserAgent ();
 
my $agent = LWP::UserAgent->new();
$agent->timeout(10);
$agent->env_proxy();

$agent->default_header( "X-API-Key" => "SBIEp8AplypmmpUHdE8q8SWc7RGTujtgoKIZfOJj" );

my @collected = ();

my $offset = 0;

while(1)
{
	my $response = $agent->get("https://api.propublica.org/congress/v1/115/both/bills/active.json?offset=$offset");

	if ($response->is_success())
	{
		my $json_in = decode_json($response->decoded_content());
		my @list = @{$json_in->{"results"}->[0]->{"bills"}};
		print "read ".(scalar @list)." from offset $offset\n";
		push @collected, @list;
		
		last unless scalar @list;
	}
	else
	{ die $response->status_line(); }
	$offset += 20;
}

write_file('laws.json', encode_json(\@collected));