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

my @targets = map {"http://www.startguide.org/orgs/orgs".sprintf("%02d",$_).".html"} (1..12);
(
	"",
);

my @collected = ();

for my $target (@targets)
{
	print "dumping ${target}\n";
	
	my $response = $agent->get($target);

	if ($response->is_success())
	{
		my $source_text = $response->decoded_content();
		
		my $header = "[unknown]";
		
		while($source_text =~ m{(?:<dt> \s* <a[ ]href="([^"]+)">([^<]+)</a> \s* </dt> \s* <dd> ([^<]+) \s+ </dd>)|(?:<h3>[0-9]+[.][0-9]+[.][ ]([^<]+)</h3>)}gcxms)
		{
			if(defined $4)
			{ $header = $4; next; }
			my ($name, $url, $desc) = ($2, $1, $3);
			$desc =~ s{^\s+|\s+$}{}g;
			#print "${header}: ${name}: ${url}\n";
			push @collected, {"type" => $header, "name" => $name, "url" => $url, "desc" => $desc};
		}
	}
	else
	{ die $response->status_line(); }
}

write_file('groups_startguide.json', encode_json(\@collected));