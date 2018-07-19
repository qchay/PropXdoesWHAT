use strict;
use JSON;
use DBI;
use DBD::mysql;
use File::Slurp;
use Data::Dumper;
use Search::Elasticsearch;
use open ( ":encoding(UTF-8)", ":std" );
use utf8;

sub connect_to_db 
{
	my $settings	 = decode_json(read_file("db_info.json"));
	my $dsn 		 = "DBI:$settings->{db_driver}:database=$settings->{db_name};host=$settings->{db_host};";
	my $drh 		 = DBI->install_driver($settings->{'db_driver'});
	return DBI->connect($dsn, $settings->{'db_user'}, $settings->{'db_pass'}, $settings->{'db_extra'}) 
		or die "DB Connect error: $DBI::errstr";
}

my $db_handle = connect_to_db();

my $es = Search::Elasticsearch->new(
	cxn_pool => 'Static::NoPing',
    nodes => [
        'http://search-propxdoeswhat-4wzolamil7fvs4ylzdfayxl6va.us-east-2.es.amazonaws.com:80',
    ]
);

my $count = 0;

for my $record (@{$db_handle->selectall_arrayref(q{
	SELECT	l.`id` as id, l.`name`, l.`title`, l.`subject`, l.`desc`,
			p.`first_name`, p.`last_name`
	FROM `laws` as l, `politicians` as p 
	WHERE l.`sponsor_id` = p.`id`;},
	{ Slice => {} })})
{
	$es->index(
    'index'	=> 'laws',
    'type'	=> 'law',
    'id'	=> $record->{'id'},
    'body'	=> {
		'title'	 => lc $record->{'title'},
        'desc'	 => lc $record->{'desc'},
        'sponsor'=> lc "$record->{first_name} $record->{last_name}",
		'merged' => lc "$record->{title} $record->{desc} $record->{first_name} $record->{last_name}"
    });
		
	print "Processed $count\n" unless (++$count % 50);
}