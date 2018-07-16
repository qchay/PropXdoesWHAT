use strict;
use DBI;
use DBD::mysql;
use File::Slurp;
use JSON;
use Data::Dumper;
use utf8;
use open ( ":encoding(UTF-8)", ":std" );

my $groups = decode_json(read_file("groups_startguide.json"));

my $keywords = {};
my $pairs = {};
my $total = 0;

for (@{$groups})
{	
	my $text = lc($_->{"name"}." ".$_->{"desc"});
	$text =~ s{u[.]s[.]}{us}g;
	$text =~ s{[&][^;]+[;]}{}g;
	my @tokens = split(m{[\W\d]+}g, $text);
	
	my $prev = undef;
	
	for(@tokens)
	{
		next if $_ =~ m{on|by|a|that|in|for|of|to|the|and|as|all|an|at|more|our|who|or|is|it|be|use|up|but|not|from};
		$keywords->{$_}++;
		$total++;
		if(defined $prev)
		{ $pairs->{"$prev $_"}++; }
		$prev = $_;
	}
}

for (sort {$keywords->{$a} <=> $keywords->{$b}} keys %{$keywords})
{
	print $keywords->{$_}."\t$_\n";
}

for (sort {$pairs->{$a} <=> $pairs->{$b}} keys %{$pairs})
{
	print $pairs->{$_}."\t$_\n";
}

print "---total: ${total}---\n";