<?php

namespace Tests\Unit\AppBundle\Component\OAuthClient;

use Biz\BaseTestCase;
use AppBundle\Component\OAuthClient\OAuthClientFactory;

class OAuthClientFactoryTest extends BaseTestCase
{
    public function testCreate()
    {
        $clazz = OAuthClientFactory::create('qq', array('key' => 'key', 'secret' => 'secret'));
        $this->assertEquals('AppBundle\Component\OAuthClient\QqOAuthClient', get_class($clazz));
    }

    /**
     * @expectedException \Biz\Common\CommonException
     */
    public function testCreateWithNonExistSecret()
    {
        OAuthClientFactory::create('qq', array('key' => 'key'));
    }

    /**
     * @expectedException \Biz\Common\CommonException
     */
    public function testCreateWithNonExistType()
    {
        OAuthClientFactory::create('dsd', array('key' => 'key', 'secret' => 'secret'));
    }
}
